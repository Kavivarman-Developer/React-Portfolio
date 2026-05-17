import { useState, useRef, useCallback, useEffect } from "react";

// ─── IndexedDB helpers ────────────────────────────────────────────────────────
const DB_NAME = "dm_portfolio";
const DB_VERSION = 1;
const FOLDERS_STORE = "folders";
const PHOTOS_STORE = "photos";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(FOLDERS_STORE)) {
        db.createObjectStore(FOLDERS_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(PHOTOS_STORE)) {
        const ps = db.createObjectStore(PHOTOS_STORE, { keyPath: "id" });
        ps.createIndex("folderId", "folderId", { unique: false });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function dbGetAll(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function dbPut(storeName, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(value);
    tx.oncomplete = resolve;
    tx.onerror = (e) => reject(e.target.error);
  });
}

async function dbDelete(storeName, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).delete(key);
    tx.oncomplete = resolve;
    tx.onerror = (e) => reject(e.target.error);
  });
}

// ─── Default folders ──────────────────────────────────────────────────────────
const DEFAULT_FOLDERS = [
  { id: "folder-1", name: "Social Media", icon: "📱", color: "#00e5ff" },
  { id: "folder-2", name: "SEO Assets", icon: "🔍", color: "#a78bfa" },
  { id: "folder-3", name: "Ad Creatives", icon: "🎯", color: "#f472b6" },
  { id: "folder-4", name: "Email Campaigns", icon: "✉️", color: "#34d399" },
  { id: "folder-5", name: "Brand Assets", icon: "🎨", color: "#fbbf24" },
];

const FOLDER_COLORS = ["#00e5ff", "#a78bfa", "#f472b6", "#34d399", "#fbbf24", "#60a5fa", "#fb923c"];

// ─── Main Component ───────────────────────────────────────────────────────────
const DigitalMarketing = () => {
  const [folders, setFolders] = useState([]);
  const [photosByFolder, setPhotosByFolder] = useState({});
  const [activeFolder, setActiveFolder] = useState("folder-1");
  const [draggingOver, setDraggingOver] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const fileInputRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Load from IndexedDB
  useEffect(() => {
    async function load() {
      try {
        let savedFolders = await dbGetAll(FOLDERS_STORE);
        if (savedFolders.length === 0) {
          for (const f of DEFAULT_FOLDERS) await dbPut(FOLDERS_STORE, f);
          savedFolders = DEFAULT_FOLDERS;
        }
        const allPhotos = await dbGetAll(PHOTOS_STORE);
        const byFolder = {};
        savedFolders.forEach((f) => { byFolder[f.id] = []; });
        allPhotos.forEach((p) => {
          if (!byFolder[p.folderId]) byFolder[p.folderId] = [];
          byFolder[p.folderId].push(p);
        });
        setFolders(savedFolders);
        setPhotosByFolder(byFolder);
        setActiveFolder(savedFolders[0]?.id || "folder-1");
      } catch (err) {
        console.error("IndexedDB load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const currentPhotos = photosByFolder[activeFolder] || [];
  const currentFolder = folders.find((f) => f.id === activeFolder);

  const readFiles = (files) =>
    Promise.all(
      Array.from(files)
        .filter((f) => f.type.startsWith("image/"))
        .map((file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) =>
              resolve({
                id: `photo-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                folderId: activeFolder,
                name: file.name,
                src: e.target.result,
                size: (file.size / 1024).toFixed(1) + " KB",
                type: file.type.split("/")[1].toUpperCase(),
                addedAt: new Date().toLocaleDateString(),
              });
            reader.readAsDataURL(file);
          })
        )
    );

  const addPhotos = async (newPhotos) => {
    if (!newPhotos.length) return;
    for (const p of newPhotos) await dbPut(PHOTOS_STORE, p);
    setPhotosByFolder((prev) => ({
      ...prev,
      [activeFolder]: [...(prev[activeFolder] || []), ...newPhotos],
    }));
  };

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setDraggingOver(false);
    const photos = await readFiles(e.dataTransfer.files);
    await addPhotos(photos);
  }, [activeFolder]);

  const handleFileInput = async (e) => {
    const photos = await readFiles(e.target.files);
    await addPhotos(photos);
    e.target.value = "";
  };

  const handleDeletePhoto = async (photoId) => {
    await dbDelete(PHOTOS_STORE, photoId);
    setPhotosByFolder((prev) => ({
      ...prev,
      [activeFolder]: (prev[activeFolder] || []).filter((p) => p.id !== photoId),
    }));
    setSelectedPhotos((prev) => prev.filter((id) => id !== photoId));
    if (hoveredPhoto?.id === photoId) setHoveredPhoto(null);
    if (lightboxPhoto?.id === photoId) setLightboxPhoto(null);
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedPhotos) await dbDelete(PHOTOS_STORE, id);
    setPhotosByFolder((prev) => ({
      ...prev,
      [activeFolder]: (prev[activeFolder] || []).filter((p) => !selectedPhotos.includes(p.id)),
    }));
    setSelectedPhotos([]);
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    const colorIdx = folders.length % FOLDER_COLORS.length;
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: newFolderName.trim(),
      icon: "📁",
      color: FOLDER_COLORS[colorIdx],
    };
    await dbPut(FOLDERS_STORE, newFolder);
    setFolders((prev) => [...prev, newFolder]);
    setPhotosByFolder((prev) => ({ ...prev, [newFolder.id]: [] }));
    setActiveFolder(newFolder.id);
    setNewFolderName("");
    setShowNewFolder(false);
    setDrawerOpen(false);
  };

  const handleDeleteFolder = async (folderId, e) => {
    e.stopPropagation();
    const folderPhotos = photosByFolder[folderId] || [];
    for (const p of folderPhotos) await dbDelete(PHOTOS_STORE, p.id);
    await dbDelete(FOLDERS_STORE, folderId);
    const remaining = folders.filter((f) => f.id !== folderId);
    setFolders(remaining);
    setPhotosByFolder((prev) => { const n = { ...prev }; delete n[folderId]; return n; });
    if (activeFolder === folderId) setActiveFolder(remaining[0]?.id || "");
  };

  const toggleSelect = (photoId) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]
    );
  };

  const switchFolder = (folderId) => {
    setActiveFolder(folderId);
    setSelectedPhotos([]);
    setDrawerOpen(false);
  };

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: "center", color: "#475569", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", background: "#080b14", minHeight: "100vh" }}>
        Loading your files...
      </div>
    );
  }

  // ── Sidebar / Folder List (shared between desktop sidebar & mobile drawer) ──
  const FolderList = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Folder list header */}
      <div style={{
        padding: "14px 16px 10px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#475569", letterSpacing: "1px", textTransform: "uppercase" }}>
          Folders
        </span>
        <button
          onClick={() => setShowNewFolder((v) => !v)}
          style={{
            width: 26, height: 26, borderRadius: 7,
            background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)",
            color: "#00e5ff", fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >+</button>
      </div>

      {showNewFolder && (
        <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <input
            autoFocus
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
            placeholder="Folder name..."
            style={{
              width: "100%", padding: "8px 10px", borderRadius: 8,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#e2e8f0", fontSize: 12, outline: "none",
              fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8,
            }}
          />
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={handleCreateFolder} style={{
              flex: 1, padding: "6px", borderRadius: 7, fontSize: 11, fontWeight: 700,
              background: "linear-gradient(135deg, #00e5ff, #8b5cf6)",
              border: "none", color: "white", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif",
            }}>Create</button>
            <button onClick={() => { setShowNewFolder(false); setNewFolderName(""); }} style={{
              padding: "6px 12px", borderRadius: 7, fontSize: 11,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#64748b", cursor: "pointer",
            }}>✕</button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto" }}>
        {folders.map((folder) => {
          const count = (photosByFolder[folder.id] || []).length;
          const isActive = activeFolder === folder.id;
          const color = folder.color || "#00e5ff";
          return (
            <div
              key={folder.id}
              onClick={() => switchFolder(folder.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "11px 14px", cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                background: isActive ? `${color}12` : "transparent",
                borderLeft: `3px solid ${isActive ? color : "transparent"}`,
                transition: "all 0.15s",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: isActive ? `${color}22` : "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? `${color}44` : "rgba(255,255,255,0.06)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, flexShrink: 0,
              }}>{folder.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: isActive ? 700 : 500,
                  color: isActive ? color : "#94a3b8",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{folder.name}</div>
                <div style={{ fontSize: 10, color: "#334155" }}>
                  {count} file{count !== 1 ? "s" : ""}
                </div>
              </div>
              <button
                onClick={(e) => handleDeleteFolder(folder.id, e)}
                style={{
                  width: 22, height: 22, borderRadius: 5,
                  background: "transparent", border: "none",
                  color: "#334155", cursor: "pointer", fontSize: 13, opacity: 0.5,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = "#fb7185"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.color = "#334155"; }}
              >✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dm-root {
          min-height: 100vh;
          background: #080b14;
          font-family: 'Space Grotesk', sans-serif;
          color: #e2e8f0;
        }
        .dm-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 14px;
          padding: 20px 16px 60px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 639px) {
          .dm-layout {
            grid-template-columns: 1fr;
            padding: 14px 12px 100px;
          }
          .dm-desktop-sidebar { display: none !important; }
        }
        .dm-mobile-bar {
          display: none;
        }
        @media (max-width: 639px) {
          .dm-mobile-bar { display: flex; }
        }
        .photo-card {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1;
          transition: transform 0.15s, border-color 0.15s;
        }
        .photo-card:hover { transform: scale(1.02); }
        .photo-card .photo-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.65);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 6px;
          opacity: 0; transition: opacity 0.2s;
        }
        .photo-card:hover .photo-overlay { opacity: 1; }
        .drawer-backdrop {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
        }
        .drawer {
          position: fixed; left: 0; top: 0; bottom: 0;
          width: 280px; z-index: 201;
          background: #0d1220;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .drawer.open { transform: translateX(0); }
        .lightbox-backdrop {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,0.92);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        .folder-chip {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          cursor: pointer; transition: all 0.15s;
          white-space: nowrap; flex-shrink: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; font-weight: 500;
          color: #64748b;
        }
        .folder-chip.active {
          background: rgba(0,229,255,0.08);
          border-color: rgba(0,229,255,0.3);
          color: #00e5ff;
        }
      `}</style>

      <div className="dm-root">
        {/* ── Mobile Drawer Backdrop ── */}
        {drawerOpen && (
          <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
        )}

        {/* ── Mobile Slide-in Drawer ── */}
        <div className={`drawer${drawerOpen ? " open" : ""}`}>
          <div style={{
            padding: "16px 16px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22, letterSpacing: 1.5,
              background: "linear-gradient(135deg, #f472b6, #8b5cf6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Digital Marketing</h2>
            <button onClick={() => setDrawerOpen(false)} style={{
              width: 28, height: 28, borderRadius: 7,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#64748b", cursor: "pointer", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <FolderList />
          </div>
        </div>

        {/* ── Lightbox ── */}
        {lightboxPhoto && (
          <div className="lightbox-backdrop" onClick={() => setLightboxPhoto(null)}>
            <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 700, width: "100%", borderRadius: 16, overflow: "hidden", background: "#0d1220", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={lightboxPhoto.src} alt={lightboxPhoto.name}
                style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", display: "block", background: "#080b14" }} />
              <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{lightboxPhoto.name}</div>
                  <div style={{ fontSize: 11, color: "#475569" }}>{lightboxPhoto.size} · {lightboxPhoto.addedAt}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => { handleDeletePhoto(lightboxPhoto.id); }}
                    style={{
                      padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                      background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.35)",
                      color: "#fb7185", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif",
                    }}>🗑 Delete</button>
                  <button onClick={() => setLightboxPhoto(null)} style={{
                    padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#64748b", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif",
                  }}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Page Header ── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            {/* Mobile hamburger — hidden, folders shown as chips below */}
            <div>
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(26px, 7vw, 36px)",
                letterSpacing: 2, lineHeight: 1,
                background: "linear-gradient(135deg, #f472b6, #8b5cf6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Digital Marketing</h1>
              <p style={{ color: "#334155", fontSize: 11, marginTop: 2 }}>
                {folders.length} folders · {Object.values(photosByFolder).flat().length} total files
              </p>
            </div>
          </div>

          {/* Mobile folder chips */}
          <div className="dm-mobile-bar" style={{
            overflowX: "auto", gap: 6, paddingBottom: 4,
            marginTop: 10, paddingBottom: 12,
          }}>
            {folders.map((folder) => {
              const isActive = activeFolder === folder.id;
              const color = folder.color || "#00e5ff";
              return (
                <div key={folder.id}
                  className={`folder-chip${isActive ? " active" : ""}`}
                  onClick={() => switchFolder(folder.id)}
                  style={isActive ? { borderColor: `${color}55`, color, background: `${color}12` } : {}}
                >
                  <span>{folder.icon}</span>
                  <span>{folder.name}</span>
                  <span style={{ fontSize: 10, opacity: 0.6 }}>({(photosByFolder[folder.id] || []).length})</span>
                </div>
              );
            })}
            <div className="folder-chip" style={{ display: "none" }} />
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div className="dm-layout">

          {/* ── Desktop Sidebar ── */}
          <div className="dm-desktop-sidebar" style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16, overflow: "hidden", height: "fit-content",
          }}>
            <FolderList />
          </div>

          {/* ── Files Panel ── */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16, overflow: "hidden",
            display: "flex", flexDirection: "column",
          }}>
            {/* Toolbar */}
            <div style={{
              padding: "12px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center",
              justifyContent: "space-between", gap: 8,
              flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: `${currentFolder?.color || "#00e5ff"}18`,
                  border: `1px solid ${currentFolder?.color || "#00e5ff"}33`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                }}>{currentFolder?.icon}</div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>
                  {currentFolder?.name}
                </span>
                <span style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 20,
                  background: `${currentFolder?.color || "#00e5ff"}12`,
                  border: `1px solid ${currentFolder?.color || "#00e5ff"}33`,
                  color: currentFolder?.color || "#00e5ff", fontWeight: 600,
                }}>{currentPhotos.length} files</span>
              </div>
              {!isMobile && (
              <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                {selectedPhotos.length > 0 && (
                  <button onClick={handleDeleteSelected} style={{
                    padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                    background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.3)",
                    color: "#fb7185", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif",
                  }}>🗑 Delete {selectedPhotos.length}</button>
                )}
                <button onClick={() => fileInputRef.current?.click()} style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                  background: "linear-gradient(135deg, #00e5ff, #8b5cf6)",
                  border: "none", color: "white", cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>+ Upload</button>
                <input ref={fileInputRef} type="file" multiple accept="image/*"
                  style={{ display: "none" }} onChange={handleFileInput} />
              </div>
              )}
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
              onDragLeave={() => setDraggingOver(false)}
              onDrop={handleDrop}
              style={{ flex: 1, padding: 14 }}
            >
              {/* Drop zone — desktop only */}
              {!isMobile && (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${draggingOver ? (currentFolder?.color || "#00e5ff") : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 12, padding: "18px 14px", textAlign: "center",
                  marginBottom: 16,
                  background: draggingOver ? `${currentFolder?.color || "#00e5ff"}06` : "transparent",
                  transition: "all 0.2s", cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 5 }}>{draggingOver ? "📂" : "🖼️"}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: draggingOver ? (currentFolder?.color || "#00e5ff") : "#475569", marginBottom: 3 }}>
                  {draggingOver ? "Drop photos here!" : "Drag & drop photos"}
                </div>
                <div style={{ fontSize: 11, color: "#334155" }}>or click to browse · PNG, JPG, GIF, WEBP</div>
              </div>
              )}

              {currentPhotos.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0", color: "#334155", fontSize: 13 }}>
                  {isMobile ? "No photos yet." : "No photos yet. Upload to get started!"}
                </div>
              ) : (
                <>
                  {selectedPhotos.length > 0 && !isMobile && (
                    <div style={{ fontSize: 11, color: "#00e5ff", marginBottom: 8, fontWeight: 600 }}>
                      {selectedPhotos.length} selected · tap photo to deselect
                    </div>
                  )}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                    gap: 10,
                  }}>
                    {currentPhotos.map((photo) => {
                      const isSelected = selectedPhotos.includes(photo.id);
                      return (
                        <div
                          key={photo.id}
                          className="photo-card"
                          onClick={() => toggleSelect(photo.id)}
                          onMouseEnter={(e) => { setHoveredPhoto(photo); setHoverPos({ x: e.clientX, y: e.clientY }); }}
                          onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
                          onMouseLeave={() => setHoveredPhoto(null)}
                          style={{
                            border: `2px solid ${isSelected ? (currentFolder?.color || "#00e5ff") : "rgba(255,255,255,0.06)"}`,
                            background: "#0d1220",
                            boxShadow: isSelected ? `0 0 12px ${currentFolder?.color || "#00e5ff"}33` : "none",
                          }}
                        >
                          <img src={photo.src} alt={photo.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

                          {/* Hover overlay — desktop only */}
                          <div className="photo-overlay">
                            <div style={{ fontSize: 10, color: "white", textAlign: "center", padding: "0 6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
                              {photo.name}
                            </div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{photo.size}</div>
                            {!isMobile && (
                            <div style={{ display: "flex", gap: 5 }}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setLightboxPhoto(photo); }}
                                style={{
                                  padding: "3px 8px", borderRadius: 5, fontSize: 9,
                                  background: "rgba(255,255,255,0.15)", border: "none",
                                  color: "white", cursor: "pointer", fontWeight: 600,
                                }}>View</button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeletePhoto(photo.id); }}
                                style={{
                                  padding: "3px 8px", borderRadius: 5, fontSize: 9,
                                  background: "rgba(244,63,94,0.3)", border: "none",
                                  color: "#fb7185", cursor: "pointer", fontWeight: 600,
                                }}>Delete</button>
                            </div>
                            )}
                          </div>

                          {isSelected && (
                            <div style={{
                              position: "absolute", top: 6, right: 6,
                              width: 20, height: 20, borderRadius: "50%",
                              background: currentFolder?.color || "#00e5ff",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 10, color: "#000", fontWeight: 800,
                              boxShadow: `0 0 8px ${currentFolder?.color || "#00e5ff"}88`,
                            }}>✓</div>
                          )}

                          <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0,
                            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                            padding: "14px 6px 5px", fontSize: 9,
                            color: "rgba(255,255,255,0.75)",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}>{photo.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Desktop Hover Preview ── */}
        {hoveredPhoto && !isMobile && (
          <div style={{
            position: "fixed",
            left: Math.min(hoverPos.x + 16, window.innerWidth - 220),
            top: Math.max(hoverPos.y - 180, 10),
            zIndex: 9999,
            background: "#0d1220",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12, overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
            pointerEvents: "none", width: 200,
          }}>
            <img src={hoveredPhoto.src} alt={hoveredPhoto.name}
              style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 5 }}>
                {hoveredPhoto.name}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#475569" }}>{hoveredPhoto.size}</span>
                <span style={{
                  fontSize: 9, padding: "2px 7px", borderRadius: 4,
                  background: `${currentFolder?.color || "#00e5ff"}15`,
                  color: currentFolder?.color || "#00e5ff", fontWeight: 700,
                }}>{hoveredPhoto.type}</span>
              </div>
              <div style={{ fontSize: 10, color: "#334155", marginTop: 4 }}>
                Added: {hoveredPhoto.addedAt}
              </div>
            </div>
          </div>
        )}

        {/* Mobile FAB removed — upload is desktop-only */}
      </div>
    </>
  );
};

export default DigitalMarketing;