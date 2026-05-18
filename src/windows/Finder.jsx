import { WindowControls } from "#components/imports";
import { locations } from "#constants/constant";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import {
  ChevronLeft,
  ChevronRight,
  Grid2x2,
  LayoutList,
  Search,
  Share,
  Sidebar,
} from "lucide-react";
import { useState } from "react";

const SIDEBAR_LOCATIONS = [
  {
    heading: "Favorites",
    items: [
      { key: "work", label: "Portfolio", icon: "/icons/work.svg" },
      { key: "about", label: "About Me", icon: "/icons/info.svg" },
      { key: "resume", label: "Resume", icon: "/icons/file.svg" },
    ],
  },
];

const Finder = () => {
  const { openWindow } = useWindowStore();
  const [activeLocation, setActiveLocation] = useState("work");
  const [openFolder, setOpenFolder] = useState(null); // id of open sub-folder
  const [history, setHistory] = useState(["work"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentLocation = locations[activeLocation];

  const navigate = (key) => {
    const newHistory = [...history.slice(0, historyIndex + 1), key];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActiveLocation(key);
    setOpenFolder(null);
  };

  const goBack = () => {
    if (historyIndex === 0) return;
    const prev = history[historyIndex - 1];
    setHistoryIndex(historyIndex - 1);
    setActiveLocation(prev);
    setOpenFolder(null);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    const next = history[historyIndex + 1];
    setHistoryIndex(historyIndex + 1);
    setActiveLocation(next);
    setOpenFolder(null);
  };

  const handleItemClick = (item) => {
    if (item.kind === "folder") {
      setOpenFolder(item.id === openFolder ? null : item.id);
    } else if (item.kind === "file") {
      if (item.fileType === "url" && item.href) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else if (item.fileType === "txt") {
        openWindow("txtfile", item);
      } else if (item.fileType === "img") {
        openWindow("imgfile", item);
      } else if (item.fileType === "pdf") {
        openWindow("resume");
      }
    }
  };

  const displayedItems = (() => {
    if (!currentLocation) return [];
    if (openFolder !== null) {
      const folder = currentLocation.children?.find((c) => c.id === openFolder);
      return folder ? folder.children ?? [] : [];
    }
    return currentLocation.children ?? [];
  })();

  const openFolderName = (() => {
    if (openFolder === null) return null;
    return currentLocation.children?.find((c) => c.id === openFolder)?.name ?? null;
  })();

  return (
    <>
      {/* Header */}
      <div id="window-header">
        <WindowControls target="finder" />
        <div className="finder-nav">
          <button
            className="finder-nav-btn"
            onClick={goBack}
            disabled={historyIndex === 0}
            aria-label="Back"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="finder-nav-btn"
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            aria-label="Forward"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="finder-breadcrumb">
          <span
            className="breadcrumb-item"
            onClick={() => setOpenFolder(null)}
          >
            {currentLocation?.name ?? "Portfolio"}
          </span>
          {openFolderName && (
            <>
              <ChevronRight size={12} className="text-gray-400" />
              <span className="breadcrumb-item active">{openFolderName}</span>
            </>
          )}
        </div>

        <div className="finder-toolbar-actions">
          <Grid2x2 size={15} className="icon" />
          <LayoutList size={15} className="icon" />
          <Share size={15} className="icon" />
          <div className="finder-search">
            <Search size={12} />
            <input type="text" placeholder="Search" readOnly />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="finder-body">
        {/* Sidebar */}
        <aside className="finder-sidebar">
          {SIDEBAR_LOCATIONS.map((group) => (
            <div key={group.heading}>
              <p className="finder-sidebar-heading">{group.heading}</p>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item.key}
                    className={`finder-sidebar-item ${
                      activeLocation === item.key ? "active" : ""
                    }`}
                    onClick={() => navigate(item.key)}
                  >
                    <img src={item.icon} alt={item.label} className="w-4 h-4" />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main content */}
        <div className="finder-content">
          {displayedItems.length === 0 ? (
            <div className="finder-empty">
              <p>Nothing here yet.</p>
            </div>
          ) : (
            <ul className="finder-grid">
              {displayedItems.map((item) => (
                <li
                  key={item.id}
                  className={`finder-item ${
                    item.kind === "folder" && openFolder === item.id
                      ? "selected"
                      : ""
                  }`}
                  onDoubleClick={() => handleItemClick(item)}
                  onClick={() =>
                    item.kind === "folder" &&
                    setOpenFolder(item.id === openFolder ? null : item.id)
                  }
                >
                  <div className="finder-item-icon">
                    <img
                      src={item.icon}
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                  <p className="finder-item-name">{item.name}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Project preview card when a folder is selected but not drilled in */}
          {openFolder !== null && activeLocation === "work" && (
            <ProjectPreview
              project={currentLocation.children?.find((c) => c.id === openFolder)}
              onOpen={handleItemClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

const ProjectPreview = ({ project, onOpen }) => {
  if (!project) return null;

  const handleOpenLink = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="finder-preview">
      {/* Fallback to the folder icon since no preview image is available */}
      <div className="finder-preview-img bg-gray-100 flex items-center justify-center p-4">
        <img src={project.icon} alt={project.name} loading="lazy" className="w-16 h-16 object-contain" />
      </div>
      <div className="finder-preview-info">
        <h3>{project.name}</h3>
        {project.description && (
          <p className="finder-preview-desc">
            {Array.isArray(project.description) ? project.description[0] : project.description}
          </p>
        )}
        <div className="finder-preview-actions">
          {project.href && (
            <button
              className="finder-btn primary"
              onClick={() => handleOpenLink(project.href)}
            >
              View Demo ↗
            </button>
          )}
          {project.github && (
            <button
              className="finder-btn secondary"
              onClick={() => handleOpenLink(project.github)}
            >
              Source Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
