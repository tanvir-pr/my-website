import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdLock, MdLogout, MdAdd, MdDelete, MdSave, MdCloudUpload } from "react-icons/md";
import { API_BASE, mediaUrl } from "../data/site";

const TOKEN_KEY = "owner_api_token";
const TABS = ["projects", "skills", "certificates"];

const emptyProject = {
  id: null,
  title: "",
  description: "",
  about: "",
  role_text: "",
  stack: "",
  gallery: [],
  highlights: "",
  site_url: "",
  github_url: "",
  image_url: "",
  card_size: "md",
  is_featured: false,
  is_published: true,
  sort_order: 1,
};

const ImageDropZone = ({
  label,
  hint,
  multiple = false,
  urls = [],
  uploading = false,
  onFiles,
  onRemove,
}) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (files.length) onFiles(files);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-400">{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition ${
          dragging ? "border-[#7c6cff] bg-[#7c6cff]/10" : "border-white/15 bg-[#0b0d14] hover:border-[#7c6cff]/60"
        }`}
      >
        <MdCloudUpload className="text-2xl text-[#7c6cff]" />
        <span className="text-sm text-gray-300">
          {uploading ? "Uploading…" : "Drop image here or click to browse"}
        </span>
        <span className="text-xs text-gray-500">{hint}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      {urls.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {urls.map((url) => (
            <div key={url} className="relative overflow-hidden rounded-lg border border-white/10">
              <img src={mediaUrl(url)} alt="" className="aspect-[4/3] w-full object-cover" />
              <button
                type="button"
                onClick={() => onRemove?.(url)}
                className="absolute right-1 top-1 rounded-md bg-black/70 px-2 py-0.5 text-xs text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SKILL_GROUPS = [
  "Machine Learning",
  "Deep Learning",
  "Gen AI",
  "Programming",
  "Frontend",
  "Backend",
  "Databases",
  "Soft Skills",
];
const emptySkill = { id: null, group_name: "Machine Learning", name: "", sort_order: 0 };
const emptyGroup = { id: null, name: "Machine Learning", summary: "", details: "", sort_order: 0 };
const emptyCert = { id: null, title: "", org: "", year: "", url: "", image_url: "", sort_order: 0 };

const OwnerPanel = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState("projects");
  const [status, setStatus] = useState("");

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillGroups, setSkillGroups] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [groupForm, setGroupForm] = useState(emptyGroup);
  const [certForm, setCertForm] = useState(emptyCert);
  const [skillsSubTab, setSkillsSubTab] = useState("groups");
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const headers = () => ({
    "Content-Type": "application/json",
    "x-owner-token": token,
  });

  const forceLogout = (message = "") => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    if (message) setLoginError(message);
  };

  const loadAll = async () => {
    try {
      const [pRes, sRes, cRes] = await Promise.all([
        fetch(`${API_BASE}/api/owner/projects`, { headers: headers() }),
        fetch(`${API_BASE}/api/skills`),
        fetch(`${API_BASE}/api/certificates`),
      ]);
      if (pRes.status === 401) {
        forceLogout("Session expired. Sign in again.");
        return;
      }
      const pData = await pRes.json();
      const sData = await sRes.json();
      const cData = await cRes.json();
      setProjects(pData.projects || []);
      setSkills(sData.skills || []);
      setSkillGroups(sData.groups || []);
      setCertificates(cData.certificates || []);
    } catch {
      setStatus("Could not load data. Is the API running?");
    }
  };

  useEffect(() => {
    if (token) loadAll();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch(`${API_BASE}/api/owner/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Login failed");
      if (!data.token) throw new Error("No token from API");
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setLoginError(err.message || "Incorrect password");
    } finally {
      setLoggingIn(false);
    }
  };

  const apiMutate = async (url, method, body) => {
    const res = await fetch(url, {
      method,
      headers: headers(),
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) {
      forceLogout("Session expired. Sign in again.");
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const res = await fetch(`${API_BASE}/api/owner/upload`, {
      method: "POST",
      headers: { "x-owner-token": token },
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) {
      forceLogout("Session expired. Sign in again.");
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data.urls || (data.url ? [data.url] : []);
  };

  const saveProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        stack: projectForm.stack,
        gallery: Array.isArray(projectForm.gallery) ? projectForm.gallery : [],
        sort_order: Number(projectForm.sort_order) || 0,
      };
      if (projectForm.id) {
        await apiMutate(`${API_BASE}/api/owner/projects/${projectForm.id}`, "PUT", payload);
        setStatus("Project updated.");
      } else {
        await apiMutate(`${API_BASE}/api/owner/projects`, "POST", payload);
        setStatus("Project created.");
      }
      setProjectForm(emptyProject);
      await loadAll();
    } catch (err) {
      if (err.message !== "Unauthorized") setStatus(err.message);
    }
  };

  const saveGroup = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: groupForm.name,
        summary: groupForm.summary,
        details: groupForm.details,
        sort_order: Number(groupForm.sort_order) || 0,
      };
      if (groupForm.id) {
        await apiMutate(`${API_BASE}/api/owner/skill-groups/${groupForm.id}`, "PUT", payload);
        setStatus("Skill category updated.");
      } else {
        await apiMutate(`${API_BASE}/api/owner/skill-groups`, "POST", payload);
        setStatus("Skill category created.");
      }
      setGroupForm(emptyGroup);
      await loadAll();
    } catch (err) {
      if (err.message !== "Unauthorized") setStatus(err.message);
    }
  };

  const saveSkill = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        group_name: skillForm.group_name,
        name: skillForm.name,
        sort_order: Number(skillForm.sort_order) || 0,
      };
      if (skillForm.id) {
        await apiMutate(`${API_BASE}/api/owner/skills/${skillForm.id}`, "PUT", payload);
        setStatus("Topic updated.");
      } else {
        await apiMutate(`${API_BASE}/api/owner/skills`, "POST", payload);
        setStatus("Topic created.");
      }
      setSkillForm(emptySkill);
      await loadAll();
    } catch (err) {
      if (err.message !== "Unauthorized") setStatus(err.message);
    }
  };

  const saveCert = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...certForm,
        sort_order: Number(certForm.sort_order) || 0,
      };
      if (certForm.id) {
        await apiMutate(`${API_BASE}/api/owner/certificates/${certForm.id}`, "PUT", payload);
        setStatus("Certificate updated.");
      } else {
        await apiMutate(`${API_BASE}/api/owner/certificates`, "POST", payload);
        setStatus("Certificate created.");
      }
      setCertForm(emptyCert);
      await loadAll();
    } catch (err) {
      if (err.message !== "Unauthorized") setStatus(err.message);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0b0d14] text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12141c] p-8"
        >
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(124,108,255,0.15)] text-[#7c6cff]">
              <MdLock size={28} />
            </div>
            <h1 className="text-2xl font-bold">Owner login</h1>
            <p className="mt-2 text-sm text-gray-400">
              Edit projects, skills, and certificates. Not linked from homepage.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Password from <code className="text-gray-300">server/.env</code> →{" "}
              <code className="text-gray-300">OWNER_ANALYTICS_PASSWORD</code> (now{" "}
              <code className="text-gray-300">123</code>).
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Owner password"
              className="w-full rounded-xl border border-white/10 bg-[#0b0d14] px-4 py-3 outline-none focus:border-[#7c6cff]"
              autoFocus
            />
            {loginError && <p className="text-sm text-red-400">{loginError}</p>}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full rounded-xl bg-[#7c6cff] py-3 font-semibold disabled:opacity-60"
            >
              {loggingIn ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            <Link to="/" className="hover:text-[#7c6cff]">
              ← Back to site
            </Link>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#7c6cff]">Owner CMS</p>
            <h1 className="text-xl font-bold">Full customize</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-gray-400 hover:text-white">
              View site
            </Link>
            <button
              onClick={() => forceLogout()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm"
            >
              <MdLogout /> Logout
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 px-5 pb-4">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t);
                setStatus("");
              }}
              className={`rounded-full px-4 py-2 text-sm capitalize ${
                tab === t ? "bg-[#7c6cff] text-white" : "border border-white/10 text-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {status && <p className="mb-4 text-sm text-emerald-300">{status}</p>}

        {tab === "projects" && (
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={saveProject} className="space-y-3 rounded-2xl border border-white/10 bg-[#12141c] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {projectForm.id ? `Edit project #${projectForm.id}` : "Add project"}
                </h2>
                {projectForm.id && (
                  <button type="button" onClick={() => setProjectForm(emptyProject)} className="text-sm text-[#7c6cff]">
                    <MdAdd className="inline" /> New
                  </button>
                )}
              </div>
              <input
                value={projectForm.title}
                onChange={(e) => setProjectForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Title *"
                className="field"
              />
              <textarea
                value={projectForm.description}
                onChange={(e) => setProjectForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short card description"
                rows={2}
                className="field"
              />
              <textarea
                value={projectForm.about}
                onChange={(e) => setProjectForm((f) => ({ ...f, about: e.target.value }))}
                placeholder="About (detail page)"
                rows={4}
                className="field"
              />
              <textarea
                value={projectForm.role_text}
                onChange={(e) => setProjectForm((f) => ({ ...f, role_text: e.target.value }))}
                placeholder="What it does / your role"
                rows={3}
                className="field"
              />
              <input
                value={projectForm.stack}
                onChange={(e) => setProjectForm((f) => ({ ...f, stack: e.target.value }))}
                placeholder="Stack tags (comma separated) e.g. React, FastAPI, PyTorch"
                className="field"
              />
              <input
                value={projectForm.highlights}
                onChange={(e) => setProjectForm((f) => ({ ...f, highlights: e.target.value }))}
                placeholder="Highlights / metrics"
                className="field"
              />
              <input
                value={projectForm.site_url}
                onChange={(e) => setProjectForm((f) => ({ ...f, site_url: e.target.value }))}
                placeholder="Live URL"
                className="field"
              />
              <input
                value={projectForm.github_url}
                onChange={(e) => setProjectForm((f) => ({ ...f, github_url: e.target.value }))}
                placeholder="GitHub URL"
                className="field"
              />
              <ImageDropZone
                label="Cover image (card + details)"
                hint="JPG / PNG / WEBP · max 6MB"
                urls={projectForm.image_url ? [projectForm.image_url] : []}
                uploading={coverUploading}
                onFiles={async (files) => {
                  try {
                    setCoverUploading(true);
                    const urls = await uploadImages(files.slice(0, 1));
                    if (urls[0]) setProjectForm((f) => ({ ...f, image_url: urls[0] }));
                    setStatus("Cover image uploaded.");
                  } catch (err) {
                    if (err.message !== "Unauthorized") setStatus(err.message);
                  } finally {
                    setCoverUploading(false);
                  }
                }}
                onRemove={() => setProjectForm((f) => ({ ...f, image_url: "" }))}
              />
              <ImageDropZone
                label="Detail gallery pictures"
                hint="Drop multiple — saved to DB and shown on project details"
                multiple
                urls={Array.isArray(projectForm.gallery) ? projectForm.gallery : []}
                uploading={galleryUploading}
                onFiles={async (files) => {
                  try {
                    setGalleryUploading(true);
                    const urls = await uploadImages(files);
                    setProjectForm((f) => ({
                      ...f,
                      gallery: [...(Array.isArray(f.gallery) ? f.gallery : []), ...urls],
                    }));
                    setStatus(`${urls.length} gallery image(s) uploaded.`);
                  } catch (err) {
                    if (err.message !== "Unauthorized") setStatus(err.message);
                  } finally {
                    setGalleryUploading(false);
                  }
                }}
                onRemove={(url) =>
                  setProjectForm((f) => ({
                    ...f,
                    gallery: (Array.isArray(f.gallery) ? f.gallery : []).filter((item) => item !== url),
                  }))
                }
              />
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm text-gray-400">
                  Card size
                  <select
                    value={projectForm.card_size}
                    onChange={(e) => setProjectForm((f) => ({ ...f, card_size: e.target.value }))}
                    className="field mt-1"
                  >
                    <option value="sm">Small — 4 per row</option>
                    <option value="md">Medium — 3 per row</option>
                    <option value="lg">Large — 2 per row</option>
                    <option value="xl">Extra large — full single row</option>
                  </select>
                </label>
                <label className="text-sm text-gray-400">
                  Sort order
                  <input
                    type="number"
                    value={projectForm.sort_order}
                    onChange={(e) => setProjectForm((f) => ({ ...f, sort_order: e.target.value }))}
                    className="field mt-1"
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={projectForm.is_featured}
                    onChange={(e) => setProjectForm((f) => ({ ...f, is_featured: e.target.checked }))}
                  />
                  Featured
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={projectForm.is_published}
                    onChange={(e) => setProjectForm((f) => ({ ...f, is_published: e.target.checked }))}
                  />
                  Published on site
                </label>
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c6cff] py-3 font-semibold">
                <MdSave /> Save project
              </button>
            </form>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-[#12141c] p-6">
              <h2 className="text-lg font-semibold">Projects on site</h2>
              {projects.map((p) => (
                <div key={p.id} className="rounded-xl border border-white/10 bg-[#0b0d14] p-4">
                  <p className="text-xs text-[#7c6cff]">
                    #{p.id} · {p.card_size}
                    {p.is_featured ? " · featured" : ""}
                    {!p.is_published ? " · hidden" : ""}
                  </p>
                  <h3 className="mt-1 font-semibold">{p.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-400">{p.description || "No summary"}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-sm"
                      onClick={() =>
                        setProjectForm({
                          id: p.id,
                          title: p.title || "",
                          description: p.description || "",
                          about: p.about || "",
                          role_text: p.role_text || "",
                          stack: Array.isArray(p.stack) ? p.stack.join(", ") : "",
                          gallery: Array.isArray(p.gallery) ? p.gallery : [],
                          highlights: p.highlights || "",
                          site_url: p.site_url === "#" ? "" : p.site_url || "",
                          github_url: p.github_url === "#" ? "" : p.github_url || "",
                          image_url: p.image_url || "",
                          card_size: p.card_size || "md",
                          is_featured: Boolean(p.is_featured),
                          is_published: p.is_published !== false,
                          sort_order: p.sort_order ?? 0,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-300"
                      onClick={async () => {
                        if (!window.confirm("Delete project?")) return;
                        try {
                          await apiMutate(`${API_BASE}/api/owner/projects/${p.id}`, "DELETE");
                          setStatus("Project deleted.");
                          if (projectForm.id === p.id) setProjectForm(emptyProject);
                          await loadAll();
                        } catch (err) {
                          if (err.message !== "Unauthorized") setStatus(err.message);
                        }
                      }}
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "skills" && (
          <div className="space-y-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSkillsSubTab("groups")}
                className={`rounded-full px-4 py-2 text-sm ${
                  skillsSubTab === "groups" ? "bg-[#7c6cff]" : "border border-white/10"
                }`}
              >
                Categories (click details)
              </button>
              <button
                type="button"
                onClick={() => setSkillsSubTab("topics")}
                className={`rounded-full px-4 py-2 text-sm ${
                  skillsSubTab === "topics" ? "bg-[#7c6cff]" : "border border-white/10"
                }`}
              >
                Topics inside boxes
              </button>
            </div>

            {skillsSubTab === "groups" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <form onSubmit={saveGroup} className="space-y-3 rounded-2xl border border-white/10 bg-[#12141c] p-6">
                  <h2 className="text-lg font-semibold">
                    {groupForm.id ? `Edit category #${groupForm.id}` : "Add skill category"}
                  </h2>
                  <input
                    value={groupForm.name}
                    onChange={(e) => setGroupForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Category name e.g. Frontend"
                    className="field"
                    list="skill-group-names"
                  />
                  <datalist id="skill-group-names">
                    {SKILL_GROUPS.map((g) => (
                      <option key={g} value={g} />
                    ))}
                  </datalist>
                  <input
                    value={groupForm.summary}
                    onChange={(e) => setGroupForm((f) => ({ ...f, summary: e.target.value }))}
                    placeholder="Short summary (card text)"
                    className="field"
                  />
                  <textarea
                    value={groupForm.details}
                    onChange={(e) => setGroupForm((f) => ({ ...f, details: e.target.value }))}
                    placeholder="Full details shown when user clicks the box"
                    rows={5}
                    className="field"
                  />
                  <input
                    type="number"
                    value={groupForm.sort_order}
                    onChange={(e) => setGroupForm((f) => ({ ...f, sort_order: e.target.value }))}
                    placeholder="Sort order"
                    className="field"
                  />
                  <button type="submit" className="w-full rounded-xl bg-[#7c6cff] py-3 font-semibold">
                    Save category
                  </button>
                </form>
                <div className="space-y-2 rounded-2xl border border-white/10 bg-[#12141c] p-6">
                  <h3 className="mb-3 font-semibold">Categories on site</h3>
                  {skillGroups.map((g) => (
                    <div key={g.id || g.name} className="rounded-xl border border-white/10 bg-[#0b0d14] p-4">
                      <p className="text-xs text-[#7c6cff]">order {g.sort_order}</p>
                      <h4 className="font-semibold">{g.name}</h4>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-400">{g.summary || "No summary"}</p>
                      <button
                        type="button"
                        className="mt-3 rounded-lg border border-white/10 px-3 py-1.5 text-sm"
                        onClick={() =>
                          setGroupForm({
                            id: g.id,
                            name: g.name || "",
                            summary: g.summary || "",
                            details: g.details || "",
                            sort_order: g.sort_order ?? 0,
                          })
                        }
                      >
                        Edit details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skillsSubTab === "topics" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <form onSubmit={saveSkill} className="space-y-3 rounded-2xl border border-white/10 bg-[#12141c] p-6">
                  <h2 className="text-lg font-semibold">{skillForm.id ? "Edit topic" : "Add topic"}</h2>
                  <select
                    value={skillForm.group_name}
                    onChange={(e) => setSkillForm((f) => ({ ...f, group_name: e.target.value }))}
                    className="field"
                  >
                    {(skillGroups.length ? skillGroups.map((g) => g.name) : SKILL_GROUPS).map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <input
                    value={skillForm.name}
                    onChange={(e) => setSkillForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Topic name e.g. React"
                    className="field"
                  />
                  <input
                    type="number"
                    value={skillForm.sort_order}
                    onChange={(e) => setSkillForm((f) => ({ ...f, sort_order: e.target.value }))}
                    placeholder="Sort order"
                    className="field"
                  />
                  <button type="submit" className="w-full rounded-xl bg-[#7c6cff] py-3 font-semibold">
                    Save topic
                  </button>
                </form>
                <div className="space-y-2 rounded-2xl border border-white/10 bg-[#12141c] p-6">
                  {skills.map((s) => (
                    <div key={s.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2">
                      <div>
                        <p className="text-xs text-[#7c6cff]">{s.group_name}</p>
                        <p className="font-medium">{s.name}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="text-sm" onClick={() => setSkillForm(s)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-sm text-red-300"
                          onClick={async () => {
                            await apiMutate(`${API_BASE}/api/owner/skills/${s.id}`, "DELETE");
                            await loadAll();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "certificates" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <form onSubmit={saveCert} className="space-y-3 rounded-2xl border border-white/10 bg-[#12141c] p-6">
              <h2 className="text-lg font-semibold">{certForm.id ? "Edit certificate" : "Add certificate"}</h2>
              <input value={certForm.title} onChange={(e) => setCertForm((f) => ({ ...f, title: e.target.value }))} placeholder="Title *" className="field" />
              <input value={certForm.org} onChange={(e) => setCertForm((f) => ({ ...f, org: e.target.value }))} placeholder="Organization" className="field" />
              <input value={certForm.year} onChange={(e) => setCertForm((f) => ({ ...f, year: e.target.value }))} placeholder="Year" className="field" />
              <input value={certForm.url} onChange={(e) => setCertForm((f) => ({ ...f, url: e.target.value }))} placeholder="Credential URL" className="field" />
              <input value={certForm.image_url} onChange={(e) => setCertForm((f) => ({ ...f, image_url: e.target.value }))} placeholder="Image URL" className="field" />
              <input type="number" value={certForm.sort_order} onChange={(e) => setCertForm((f) => ({ ...f, sort_order: e.target.value }))} placeholder="Sort order" className="field" />
              <button type="submit" className="w-full rounded-xl bg-[#7c6cff] py-3 font-semibold">
                Save certificate
              </button>
            </form>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-[#12141c] p-6">
              {certificates.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2">
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-sm text-gray-400">
                      {c.org} {c.year ? `· ${c.year}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="text-sm" onClick={() => setCertForm(c)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-sm text-red-300"
                      onClick={async () => {
                        await apiMutate(`${API_BASE}/api/owner/certificates/${c.id}`, "DELETE");
                        await loadAll();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        .field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: #0b0d14;
          padding: 0.75rem 1rem;
          color: white;
          outline: none;
        }
        .field:focus { border-color: #7c6cff; }
      `}</style>
    </div>
  );
};

export default OwnerPanel;
