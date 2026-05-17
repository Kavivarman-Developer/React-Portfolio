import { useState, useRef, useEffect } from "react";

// ─── IndexedDB helpers ────────────────────────────────────────────────────────
const DB_NAME = "pv_portfolio_v2";
const DB_VERSION = 1;
const PHOTOS_STORE = "project_photos";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(PHOTOS_STORE)) {
        const s = db.createObjectStore(PHOTOS_STORE, { keyPath: "id" });
        s.createIndex("projectId", "projectId", { unique: false });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function dbGetAll(store) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = (e) => rej(e.target.error);
  });
}

async function dbPut(store, value) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(value);
    tx.oncomplete = res;
    tx.onerror = (e) => rej(e.target.error);
  });
}

async function dbDelete(store, key) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).delete(key);
    tx.oncomplete = res;
    tx.onerror = (e) => rej(e.target.error);
  });
}

// ─── Projects data ────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: 1, name: "Real-Time CRM System", description: "Enterprise CRM with live updates & AI lead scoring", stack: ["React", "Socket.IO", "Node.js", "MongoDB"], status: "Live", year: "2024", github: "#", demo: "#", color: "#00e5ff" },
  { id: 2, name: "Visitor Management System", description: "Smart check-in with QR codes & badge printing", stack: ["React", "Express", "Firebase", "REST API"], status: "Live", year: "2024", github: "#", demo: "#", color: "#a78bfa" },
  { id: 3, name: "AI Course Platform", description: "Adaptive learning with AI-curated paths & analytics", stack: ["React", "Node.js", "MongoDB", "Tailwind"], status: "In Progress", year: "2024", github: "#", demo: "#", color: "#f59e0b" },
  { id: 4, name: "Call Management Dashboard", description: "VoIP dashboard with call analytics & team metrics", stack: ["React", "Socket.IO", "REST API", "Framer Motion"], status: "Live", year: "2023", github: "#", demo: "#", color: "#34d399" },
  { id: 5, name: "Portfolio Website", description: "Personal portfolio with animations & dark theme", stack: ["React", "Vite", "Tailwind", "Framer Motion"], status: "Live", year: "2023", github: "#", demo: "#", color: "#f472b6" },
  { id: 6, name: "E-Commerce Dashboard", description: "Admin panel with product & order management", stack: ["React", "Node.js", "MongoDB", "Express"], status: "Completed", year: "2023", github: "#", demo: "#", color: "#60a5fa" },
  { id: 7, name: "Task Management App", description: "Kanban board with drag & drop task management", stack: ["React", "Firebase", "Tailwind"], status: "Completed", year: "2022", github: "#", demo: "#", color: "#fb923c" },
];

const STATUS_CONFIG = {
  Live: { dot: "#22c55e", bg: "rgba(34,197,94,0.12)", color: "#4ade80", label: "🟢 Live" },
  "In Progress": { dot: "#f59e0b", bg: "rgba(245,158,11,0.12)", color: "#fbbf24", label: "🟡 In Progress" },
  Completed: { dot: "#818cf8", bg: "rgba(129,140,248,0.12)", color: "#a5b4fc", label: "🔵 Completed" },
};

// ─── Main Component ───────────────────────────────────────────────────────────
const isMediaFile = (file) => file.type.startsWith("image/") || file.type.startsWith("video/");
const isVideoMedia = (media) =>
  media?.mediaType === "video" || media?.mimeType?.startsWith("video/") || /\.(mp4|mov|webm|ogg)$/i.test(media?.src || "");

export default function ProjectView() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [photosByProject, setPhotosByProject] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [draggingOver, setDraggingOver] = useState(false);
  const [view, setView] = useState("grid"); // grid | list
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef(null);
  const activeUploadProject = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    dbGetAll(PHOTOS_STORE).then((all) => {
      const byProject = {};
      all.forEach((p) => {
        if (!byProject[p.projectId]) byProject[p.projectId] = [];
        byProject[p.projectId].push(p);
      });
      setPhotosByProject(byProject);
    });
  }, []);

  const filtered = PROJECTS.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))) &&
      (filterStatus === "All" || p.status === filterStatus)
    );
  });

  // ── Local upload ─────────────────────────────────────────────────────────
  const uploadToLocalFolder = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok || !data.files?.[0]?.url) throw new Error(data.error || "Local upload failed");
    return data.files[0];
  };

  const readFiles = (files, projectId) =>
    Promise.all(
      Array.from(files)
        .filter(isMediaFile)
        .map(async (file) => {
          const uploaded = await uploadToLocalFolder(file);
          return {
            id: `pp-${projectId}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            projectId,
            name: file.name,
            src: uploaded.url,
            storedName: uploaded.fileName,
            mimeType: uploaded.mimeType || file.type,
            mediaType: file.type.startsWith("video/") ? "video" : "image",
            size: (file.size / 1024).toFixed(1) + " KB",
            addedAt: new Date().toLocaleDateString(),
          };
        })
    );

  const handleUpload = async (e, projectId) => {
    const files = Array.from(e.target.files).filter(isMediaFile);
    if (!files.length) return;
    setUploading(true);
    try {
      const newPhotos = await readFiles(files, projectId);
      for (const p of newPhotos) await dbPut(PHOTOS_STORE, p);
      setPhotosByProject((prev) => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), ...newPhotos],
      }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Make sure the Vite dev server is running.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDrop = async (e, projectId) => {
    e.preventDefault();
    setDraggingOver(false);
    setUploading(true);
    try {
      const newPhotos = await readFiles(e.dataTransfer.files, projectId);
      for (const p of newPhotos) await dbPut(PHOTOS_STORE, p);
      setPhotosByProject((prev) => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), ...newPhotos],
      }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Make sure the Vite dev server is running.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId, projectId) => {
    await dbDelete(PHOTOS_STORE, photoId);
    setPhotosByProject((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || []).filter((p) => p.id !== photoId),
    }));
    setSelectedPhotos((prev) => prev.filter((id) => id !== photoId));
    const remaining = (photosByProject[projectId] || []).filter((p) => p.id !== photoId);
    if (lightboxPhoto?.id === photoId) {
      if (remaining.length > 0) {
        const newIdx = Math.min(lightboxIdx, remaining.length - 1);
        setLightboxPhoto(remaining[newIdx]);
        setLightboxIdx(newIdx);
      } else {
        setLightboxPhoto(null);
      }
    }
  };

  const handleDeleteSelected = async (projectId) => {
    for (const id of selectedPhotos) await dbDelete(PHOTOS_STORE, id);
    setPhotosByProject((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || []).filter((p) => !selectedPhotos.includes(p.id)),
    }));
    setSelectedPhotos([]);
    setLightboxPhoto(null);
  };

  const toggleSelect = (photoId) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]
    );
  };

  const openProject = (project) => {
    setSelectedProject(project);
    setSelectedPhotos([]);
    setLightboxPhoto(null);
    setLightboxIdx(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setLightboxPhoto(null);
    setSelectedPhotos([]);
  };

  const openLightbox = (photo, idx) => {
    setLightboxPhoto(photo);
    setLightboxIdx(idx);
  };

  const goPhoto = (dir) => {
    if (!selectedProject) return;
    const photos = photosByProject[selectedProject.id] || [];
    const newIdx = Math.max(0, Math.min(photos.length - 1, lightboxIdx + dir));
    setLightboxIdx(newIdx);
    setLightboxPhoto(photos[newIdx]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080b14; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        .pv-root {
          min-height: 100vh;
          background: #080b14;
          font-family: 'Space Grotesk', sans-serif;
          color: #e2e8f0;
        }
        .glass {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
        }
        .glass-strong {
          background: rgba(15,20,35,0.95);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(24px);
        }
        .project-card {
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .project-card:hover::before { opacity: 1; }
        .project-card:hover { transform: translateY(-2px); }
        .photo-thumb {
          transition: all 0.2s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .photo-thumb:hover .photo-overlay { opacity: 1 !important; }
        .photo-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.65);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 6px; opacity: 0; transition: opacity 0.2s;
        }
        .btn-primary {
          background: linear-gradient(135deg, #00e5ff, #8b5cf6);
          border: none; color: white; font-family: 'Space Grotesk', sans-serif;
          font-weight: 600; cursor: pointer; transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.85; }
        .btn-ghost {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8; font-family: 'Space Grotesk', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
        .btn-danger {
          background: rgba(244,63,94,0.15);
          border: 1px solid rgba(244,63,94,0.35);
          color: #fb7185; font-family: 'Space Grotesk', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-danger:hover { background: rgba(244,63,94,0.25); }
        .filter-btn {
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: #64748b; font-family: 'Space Grotesk', sans-serif;
          font-weight: 500; cursor: pointer; transition: all 0.2s;
        }
        .filter-btn.active {
          background: rgba(0,229,255,0.1);
          border-color: rgba(0,229,255,0.35);
          color: #00e5ff;
        }
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex; align-items: flex-start; justify-content: center;
          padding: 12px; overflow-y: auto;
        }
        .modal-box {
          width: 100%; max-width: 780px;
          border-radius: 20px;
          margin: auto;
        }
        .drop-zone {
          border: 2px dashed rgba(255,255,255,0.1);
          border-radius: 14px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .drop-zone:hover, .drop-zone.active {
          border-color: #00e5ff;
          background: rgba(0,229,255,0.04);
        }
        .stack-tag {
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          background: rgba(0,229,255,0.07);
          border: 1px solid rgba(0,229,255,0.18);
          color: #00e5ff;
          white-space: nowrap;
        }
        .check-bubble {
          position: absolute; top: 6px; right: 6px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #00e5ff; display: flex;
          align-items: center; justify-content: center;
          font-size: 10px; color: #000; font-weight: 800;
          box-shadow: 0 0 10px rgba(0,229,255,0.5);
        }
        .thumbnail-strip {
          display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;
        }
        .thumbnail-strip::-webkit-scrollbar { height: 3px; }
        .nav-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.15);
          color: white; font-size: 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .nav-arrow:hover { background: rgba(0,229,255,0.25); border-color: #00e5ff; }
        .nav-arrow:disabled { opacity: 0.25; pointer-events: none; }
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
          .modal-backdrop { padding: 0; align-items: flex-end; }
          .modal-box { border-radius: 20px 20px 0 0; max-height: 96vh; }
        }
      `}</style>

      <div className="pv-root">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 14px 60px" }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: "linear-gradient(135deg, #00e5ff22, #8b5cf622)",
                border: "1px solid rgba(0,229,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>🗂</div>
              <div>
                <h1 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(28px, 8vw, 42px)",
                  letterSpacing: 2, lineHeight: 1,
                  background: "linear-gradient(135deg, #00e5ff, #a78bfa)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>Project View</h1>
                <p style={{ color: "#475569", fontSize: 12 }}>
                  {PROJECTS.length} projects · tap to view & manage photos
                </p>
              </div>
            </div>
          </div>

          {/* ── Filters ── */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", flex: "1 1 160px" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#475569" }}>🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                style={{
                  width: "100%", padding: "9px 12px 9px 32px", borderRadius: 10,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "'Space Grotesk', sans-serif",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["All", "Live", "In Progress", "Completed"].map((s) => (
                <button key={s} className={`filter-btn${filterStatus === s ? " active" : ""}`}
                  onClick={() => setFilterStatus(s)}
                  style={{ padding: "7px 12px", borderRadius: 8, fontSize: 11 }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {["grid", "list"].map((v) => (
                <button key={v} className={`filter-btn${view === v ? " active" : ""}`}
                  onClick={() => setView(v)}
                  style={{ padding: "7px 10px", borderRadius: 8, fontSize: 14 }}>
                  {v === "grid" ? "⊞" : "☰"}
                </button>
              ))}
            </div>
          </div>

          {/* ── Project Grid ── */}
          {view === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {filtered.map((p) => {
                const st = STATUS_CONFIG[p.status];
                const photos = photosByProject[p.id] || [];
                return (
                  <div key={p.id} className="project-card glass"
                    onClick={() => openProject(p)}
                    style={{
                      borderRadius: 16,
                      borderTop: `2px solid ${p.color}33`,
                      padding: 0, overflow: "hidden",
                    }}>
                    {/* Color stripe */}
                    <div style={{ height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

                    {/* Photo preview strip */}
                    {photos.length > 0 ? (
                      <div style={{ height: 100, display: "flex", gap: 1, overflow: "hidden" }}>
                        {photos.slice(0, 3).map((ph, i) => (
                          isVideoMedia(ph) ? (
                            <video key={ph.id} src={ph.src} muted playsInline
                              style={{
                                flex: i === 0 ? 2 : 1, height: "100%",
                                objectFit: "cover", display: "block", minWidth: 0,
                              }} />
                          ) : (
                            <img key={ph.id} src={ph.src} alt={ph.name}
                              style={{
                                flex: i === 0 ? 2 : 1, height: "100%",
                                objectFit: "cover", display: "block", minWidth: 0,
                              }} />
                          )
                        ))}
                        {photos.length > 3 && (
                          <div style={{
                            flex: 1, height: "100%", background: "rgba(0,0,0,0.6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, color: "#94a3b8", fontWeight: 600,
                          }}>+{photos.length - 3}</div>
                        )}
                      </div>
                    ) : (
                      <div style={{
                        height: 100, display: "flex", alignItems: "center", justifyContent: "center",
                        background: `${p.color}08`, color: "#334155", fontSize: 28,
                      }}>📁</div>
                    )}

                    <div style={{ padding: "14px 14px 12px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.3, flex: 1 }}>
                          {p.name}
                        </h3>
                        <span style={{
                          fontSize: 10, padding: "2px 7px", borderRadius: 20,
                          background: st.bg, color: st.color, fontWeight: 600,
                          marginLeft: 8, whiteSpace: "nowrap", flexShrink: 0,
                        }}>{p.status}</span>
                      </div>
                      <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5, marginBottom: 10 }}>
                        {p.description}
                      </p>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                        {p.stack.slice(0, 3).map((t) => (
                          <span key={t} className="stack-tag">{t}</span>
                        ))}
                        {p.stack.length > 3 && (
                          <span style={{ fontSize: 10, color: "#475569" }}>+{p.stack.length - 3}</span>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 10, color: "#475569" }}>{p.year} · {photos.length} photo{photos.length !== 1 ? "s" : ""}</span>
                        <span style={{ fontSize: 11, color: p.color, fontWeight: 600 }}>View →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── List View ── */
            <div className="glass" style={{ borderRadius: 16, overflow: "hidden" }}>
              {filtered.map((p, i) => {
                const st = STATUS_CONFIG[p.status];
                const photos = photosByProject[p.id] || [];
                return (
                  <div key={p.id}
                    className="project-card"
                    onClick={() => openProject(p)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "14px 16px",
                      borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      borderLeft: `3px solid ${p.color}`,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    {/* Photos mini */}
                    <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                      {photos.slice(0, 2).map((ph) => (
                        isVideoMedia(ph) ? (
                          <video key={ph.id} src={ph.src} muted playsInline
                            style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover" }} />
                        ) : (
                          <img key={ph.id} src={ph.src} alt={ph.name}
                            style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover" }} />
                        )
                      ))}
                      {photos.length === 0 && (
                        <div style={{
                          width: 36, height: 36, borderRadius: 6,
                          background: `${p.color}15`, display: "flex",
                          alignItems: "center", justifyContent: "center", fontSize: 16,
                        }}>📁</div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0", marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description}</div>
                    </div>
                    <div className="hide-mobile" style={{ display: "flex", gap: 4 }}>
                      {p.stack.slice(0, 2).map((t) => <span key={t} className="stack-tag">{t}</span>)}
                    </div>
                    <span style={{
                      fontSize: 10, padding: "3px 8px", borderRadius: 20,
                      background: st.bg, color: st.color, fontWeight: 600,
                      flexShrink: 0,
                    }}>{p.status}</span>
                    <span style={{ fontSize: 11, color: "#475569", flexShrink: 0 }}>{photos.length}📷</span>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 12, fontSize: 11, color: "#334155", textAlign: "right" }}>
            {filtered.length} of {PROJECTS.length} projects
          </div>
        </div>

        {/* ─── Hidden file input ─── */}
        <input ref={fileInputRef} type="file" multiple accept="image/*,video/*"
          style={{ display: "none" }}
          onChange={(e) => handleUpload(e, activeUploadProject.current)} />

        {/* ─── Project Modal ─── */}
        {selectedProject && (() => {
          const photos = photosByProject[selectedProject.id] || [];
          const st = STATUS_CONFIG[selectedProject.status];
          return (
            <div className="modal-backdrop" onClick={closeModal}>
              <div className="modal-box glass-strong" onClick={(e) => e.stopPropagation()}>
                {/* Colored top bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${selectedProject.color}, transparent)`, borderRadius: "20px 20px 0 0" }} />

                {/* Modal Header */}
                <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: 10, padding: "3px 9px", borderRadius: 20,
                          background: st.bg, color: st.color, fontWeight: 600,
                        }}>{selectedProject.status}</span>
                        <span style={{ fontSize: 11, color: "#475569" }}>{selectedProject.year}</span>
                      </div>
                      <h2 style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(20px, 5vw, 28px)",
                        letterSpacing: 1.5, color: "#e2e8f0", marginBottom: 6,
                      }}>{selectedProject.name}</h2>
                      <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{selectedProject.description}</p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                        {selectedProject.stack.map((t) => <span key={t} className="stack-tag">{t}</span>)}
                      </div>
                    </div>
                    <button onClick={closeModal} className="btn-ghost"
                      style={{ width: 32, height: 32, borderRadius: 8, fontSize: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  </div>
                </div>

                {/* ── Photo Section ── */}
                <div style={{ padding: "18px 20px" }}>
                  {/* Section header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>
                        Project Photos
                        <span style={{ fontSize: 11, fontWeight: 400, color: "#475569", marginLeft: 6 }}>
                          {photos.length} file{photos.length !== 1 ? "s" : ""}
                        </span>
                      </h3>
                    </div>
                    {!isMobile && (
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {selectedPhotos.length > 0 && (
                          <button className="btn-danger"
                            onClick={() => handleDeleteSelected(selectedProject.id)}
                            style={{ padding: "7px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600 }}>
                            🗑 Delete {selectedPhotos.length}
                          </button>
                        )}
                        <button className="btn-primary"
                          onClick={() => { activeUploadProject.current = selectedProject.id; fileInputRef.current?.click(); }}
                          style={{ padding: "7px 14px", borderRadius: 8, fontSize: 12 }}>
                          {uploading ? "Uploading..." : "+ Add Photos"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Drop zone — desktop only */}
                  {!isMobile && (
                  <div
                    className={`drop-zone${draggingOver ? " active" : ""}`}
                    onClick={() => { activeUploadProject.current = selectedProject.id; fileInputRef.current?.click(); }}
                    onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
                    onDragLeave={() => setDraggingOver(false)}
                    onDrop={(e) => handleDrop(e, selectedProject.id)}
                    style={{ padding: "14px", textAlign: "center", marginBottom: 16 }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{draggingOver ? "📂" : "🖼️"}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: draggingOver ? "#00e5ff" : "#475569" }}>
                      {draggingOver ? "Drop here!" : "Drag & drop or click to upload"}
                    </div>
                    <div style={{ fontSize: 10, color: "#334155", marginTop: 2 }}>PNG, JPG, GIF, WEBP</div>
                  </div>
                  )}

                  {photos.length > 0 ? (
                    <>
                      {/* Big Viewer */}
                      {lightboxPhoto ? (
                        <div style={{ marginBottom: 12 }}>
                          <div style={{
                            position: "relative", borderRadius: 14, overflow: "hidden",
                            background: "#0f1423", aspectRatio: "16/9", marginBottom: 10,
                          }}>
                            {isVideoMedia(lightboxPhoto) ? (
                              <video src={lightboxPhoto.src} controls autoPlay
                                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                            ) : (
                              <img src={lightboxPhoto.src} alt={lightboxPhoto.name}
                                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                            )}
                            {/* Nav */}
                            {photos.length > 1 && (
                              <>
                                <button className="nav-arrow" disabled={lightboxIdx === 0}
                                  onClick={() => goPhoto(-1)} style={{ left: 10 }}>‹</button>
                                <button className="nav-arrow" disabled={lightboxIdx === photos.length - 1}
                                  onClick={() => goPhoto(1)} style={{ right: 10 }}>›</button>
                              </>
                            )}
                            {/* Info bar */}
                            <div style={{
                              position: "absolute", bottom: 0, left: 0, right: 0,
                              background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                              padding: "24px 14px 12px",
                              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                            }}>
                              <div>
                                <div style={{ fontSize: 12, color: "white", fontWeight: 500 }}>{lightboxPhoto.name}</div>
                                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{lightboxPhoto.size} · {lightboxPhoto.addedAt}</div>
                              </div>
                              <button className="btn-danger"
                                onClick={() => handleDeletePhoto(lightboxPhoto.id, selectedProject.id)}
                                style={{ padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600 }}>
                                🗑 Delete
                              </button>
                            </div>
                            <div style={{
                              position: "absolute", top: 10, right: 10,
                              background: "rgba(0,0,0,0.6)", borderRadius: 6,
                              padding: "3px 8px", fontSize: 10, color: "white",
                            }}>{lightboxIdx + 1} / {photos.length}</div>
                            <button onClick={() => setLightboxPhoto(null)}
                              style={{
                                position: "absolute", top: 10, left: 10,
                                background: "rgba(0,0,0,0.6)", border: "none",
                                borderRadius: 6, padding: "3px 8px",
                                fontSize: 10, color: "white", cursor: "pointer",
                              }}>✕ Close</button>
                          </div>
                        </div>
                      ) : null}

                      {/* Photo Grid */}
                      {selectedPhotos.length > 0 && (
                        <div style={{
                          fontSize: 11, color: "#00e5ff", marginBottom: 8, fontWeight: 600,
                        }}>
                          {selectedPhotos.length} photo{selectedPhotos.length > 1 ? "s" : ""} selected · tap to deselect
                        </div>
                      )}
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                        gap: 8,
                      }}>
                        {photos.map((ph, idx) => {
                          const isSelected = selectedPhotos.includes(ph.id);
                          const isViewing = lightboxPhoto?.id === ph.id;
                          return (
                            <div key={ph.id} className="photo-thumb"
                              style={{
                                borderRadius: 10, overflow: "hidden",
                                border: `2px solid ${isViewing ? "#00e5ff" : isSelected ? "#a78bfa" : "rgba(255,255,255,0.06)"}`,
                                aspectRatio: "1", background: "#0f1423",
                              }}
                              onClick={() => openLightbox(ph, idx)}
                            >
                              {isVideoMedia(ph) ? (
                                <video src={ph.src} muted playsInline
                                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                              ) : (
                                <img src={ph.src} alt={ph.name}
                                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                              )}
                              <div className="photo-overlay">
                                <div style={{ fontSize: 9, color: "white", textAlign: "center", padding: "0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
                                  {ph.name}
                                </div>
                                {!isMobile && (
                                <div style={{ display: "flex", gap: 4 }}>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); toggleSelect(ph.id); }}
                                    style={{
                                      padding: "2px 7px", borderRadius: 5, fontSize: 9,
                                      background: isSelected ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.15)",
                                      border: "none", color: "white", cursor: "pointer", fontWeight: 600,
                                    }}>
                                    {isSelected ? "✓ Sel" : "Select"}
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleDeletePhoto(ph.id, selectedProject.id); }}
                                    style={{
                                      padding: "2px 7px", borderRadius: 5, fontSize: 9,
                                      background: "rgba(244,63,94,0.3)", border: "none",
                                      color: "#fb7185", cursor: "pointer", fontWeight: 600,
                                    }}>Del</button>
                                </div>
                                )}
                              </div>
                              {isSelected && <div className="check-bubble">✓</div>}
                              {isViewing && !isSelected && (
                                <div style={{
                                  position: "absolute", top: 6, right: 6,
                                  width: 8, height: 8, borderRadius: "50%",
                                  background: "#00e5ff",
                                }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: "24px 0", color: "#334155", fontSize: 13 }}>
                      No photos yet · Upload to get started
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div style={{ padding: "0 20px 20px", display: "flex", gap: 10 }}>
                  <a href={selectedProject.github}
                    style={{
                      flex: 1, padding: "11px", borderRadius: 10, textAlign: "center",
                      border: "1px solid rgba(255,255,255,0.1)", color: "#64748b",
                      textDecoration: "none", fontSize: 12, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif",
                    }}>⚙ GitHub</a>
                  <a href={selectedProject.demo}
                    style={{
                      flex: 1, padding: "11px", borderRadius: 10, textAlign: "center",
                      background: `linear-gradient(135deg, ${selectedProject.color}, #8b5cf6)`,
                      color: "white", textDecoration: "none", fontSize: 12, fontWeight: 600,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>↗ Live Demo</a>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </>
  );
}
