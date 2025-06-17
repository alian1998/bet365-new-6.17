
"use client";

import { useEffect, useRef, useState } from "react";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { FaMicrophone, FaPaperclip, FaEdit } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import clsx from "clsx";
import io from "socket.io-client";
import axiosInstance from "@/utils/axiosConfig";
import { getGameToken } from "@/utils/token";
import AudioPlayer from "./AudioPlayer";
import { useContext } from "react";
import { ContextApi } from "@/lib/provider/Providers";
import Image from "next/image";


interface Message {
  id?: string;
  from: string;
  type: "mixed";
  text?: string;
  audios?: { name: string }[];
  files?: { name: string }[];
  timestamp: string;
  isEditing?: boolean;
  replyTo?: { text?: string; id?: string };
  replyToId?: string;
  isRead?: boolean;
  readAt?: string;
  isEdited?: boolean;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  username: string;
  adminId: string;
  adminName?: string;
};
 const token = getGameToken();
const isLoggedIn = Boolean(token);

const socket = io("https://api.bet365all.live", {
  transports: ["websocket"],
  auth: {
    token, // ✅ pass token from utility function
  },
});


export default function ChatModal({ isOpen, onClose, username, adminId, adminName, onOpen }: Props) {
const context = useContext(ContextApi);
if (!context) throw new Error("Context not found");
const { assets } = context;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [threadCreatedNow, setThreadCreatedNow] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [pendingAudios, setPendingAudios] = useState<Blob[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchIndices, setMatchIndices] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);


  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  //const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const messageRefsById = useRef<Record<string, HTMLDivElement | null>>({});
  const messageRefsByIndex = useRef<(HTMLDivElement | null)[]>([]);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);
  
  useEffect(() => {
  if (isOpen && onOpen) {
    onOpen(); // ✅ notify parent when opened
  }
}, [isOpen]);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

useEffect(() => {
  if (searchTerm.trim()) {
    const lower = searchTerm.toLowerCase();
    const matches = messages.map((msg, i) => {
      const textMatch = msg.text?.toLowerCase().includes(lower);
      const fileMatch = msg.files?.some(f => f.name.toLowerCase().includes(lower));
      const audioMatch = msg.audios?.some(a => a.name.toLowerCase().includes(lower));
      const timeMatch = msg.timestamp.toLowerCase().includes(lower);

      return (textMatch || fileMatch || audioMatch || timeMatch) ? i : -1;
    }).filter(i => i !== -1);

    setMatchIndices(matches);
    setCurrentMatchIndex(0);
  } else {
    setMatchIndices([]);
  }
}, [searchTerm, messages]);


useEffect(() => {
  const index = matchIndices[currentMatchIndex];
  const el = typeof index === "number" ? messageRefsByIndex.current[index] : null;

  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    // ❌ DO NOT apply ring or animate here
  }
}, [currentMatchIndex, matchIndices]);


useEffect(() => {
  if (!isOpen || !threadId) return;

  const hasUnread = messages.some(msg => msg.from === "admin" && !msg.isRead);
  if (hasUnread) {
    socket.emit("markRead", { threadId, viewer: "user" });
  }
}, [messages, threadId, isOpen]);


  useEffect(() => {
    const fetchThread = async () => {
  try {
    const res = await axiosInstance.get(`/chat/thread/${adminId}`);
    const { id } = res.data;
    setThreadId(id);
    socket.emit("joinThread", { threadId: id });

    // 🔁 Realtime message fetch
    socket.emit("getMessages", { threadId: id });

    socket.once("messagesFetched", ({ threadId: tid, messages: allMsgs }) => {
      if (tid !== id) return;

      const enriched = allMsgs.map((msg: any) => {
        if (msg.replyToId) {
          const replyToMsg = allMsgs.find((m: any) => m.id === msg.replyToId);
          if (replyToMsg) {
            msg.replyTo = { text: replyToMsg.text || "[Attachment]", id: replyToMsg.id };
          }
        }
        return msg;
      });

      setMessages(enriched);
      if (enriched.length === 0) setThreadCreatedNow(true);
    });
  } catch (err) {
    console.error("Error fetching thread:", err);
  }
};


    if (isOpen) fetchThread();
  }, [isOpen, adminId]);

  useEffect(() => {
    socket.on("newMessage", (msg: Message) => {
      setMessages((prev) => {
        let enriched = msg;
        if (msg.replyToId) {
          const original = prev.find(m => m.id === msg.replyToId);
          if (original) {
            enriched = { ...msg, replyTo: { text: original.text || "[Attachment]", id: original.id } };
          }
        }
        return [...prev, enriched];
      });
    });

socket.on("messageEdited", (updated: Message) => {
  setMessages((prev) =>
    prev.map((m) =>
      m.id === updated.id
        ? {
            ...m,
            text: updated.text,
            isEdited: true,
            replyToId: updated.replyToId,
            replyTo: updated.replyToId
              ? (() => {
                  const original = prev.find((x) => x.id === updated.replyToId);
                  return original ? { text: original.text || "[Attachment]", id: original.id } : undefined;
                })()
              : undefined,
          }
        : m
    )
  );
});


    socket.on("readConfirmed", ({ threadId: id, by }) => {
  if (id !== threadId) return;

  setMessages((prev) =>
    prev.map((m) =>
      m.from === (by === "admin" ? "user" : "admin")
        ? { ...m, isRead: true, readAt: new Date().toISOString() }
        : m
    )
  );
});


    return () => {
      socket.off("newMessage");
      socket.off("messageEdited");
      socket.off("readConfirmed");
    };
  }, [threadId]);

  const toggleRecording = async () => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
recorder.onstop = () => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
  const name = `${username}-audio-${timestamp}.webm`;

  const audioBlob = new Blob(chunks, { type: "audio/webm" });
  const audioFile = new File([audioBlob], name, { type: "audio/webm" });

  setPendingAudios((prev) => [...prev, audioFile]); // treat it like File[]
  stream.getTracks().forEach((track) => track.stop());
};


      setMediaRecorder(recorder);
      recorder.start();

setTimeout(() => {
  if (recorder.state !== "inactive") {
    recorder.stop(); // stop after 3 minutes
  }
}, 180000); // 180,000ms = 3 minutes

      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied or failed:", err);
    }
  };
  
const uploadFilesToServer = async () => {
  if (pendingFiles.length === 0 && pendingAudios.length === 0) return { fileNames: [], audioNames: [] };

  const formData = new FormData();
  pendingFiles.forEach(f => formData.append("files", f));
  pendingAudios.forEach(a => formData.append("files", a));

  setIsUploading(true);
  try {
    const res = await axiosInstance.post("/chat/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const uploaded = res.data?.data ?? [];
    const fileNames = uploaded.filter((name:string) => !name.endsWith(".webm"));
    const audioNames = uploaded.filter((name:string) => name.endsWith(".webm"));
    return { fileNames, audioNames };
  } catch (err) {
    console.error("Upload failed", err);
    return { fileNames: [], audioNames: [] };
  } finally {
    setIsUploading(false);
  }
};



  const handleSend = async () => {
    if (!threadId) return;

  const { fileNames, audioNames } = await uploadFilesToServer();
  console.log("Uploaded files:", fileNames);
console.log("Uploaded audios:", audioNames);

 const files = pendingFiles.map((f) => ({ name: f.name }));
    const audios = pendingAudios.map((a) => ({ name: (a as any).name }));

    
    if (editingIndex !== null) {
  const editingMsg = messages[editingIndex];
  if (editingMsg?.id) {
    socket.emit("editMessage", {
      id: editingMsg.id,
      newText: message,
      replyToId: editingMsg.replyToId, // ✅ Preserve replyToId
    });
  }
  setEditingIndex(null);
  setMessage("");
  setPendingFiles([]);
  setPendingAudios([]);
  setReplyTo(null);
  return;
}


    const msg = {
      threadId,
      from: "user",
      text: message || undefined,
      files: files.length ? files : undefined,
      audios: audios.length ? audios : undefined,
      replyToId: replyTo?.id,
    };

    socket.emit("sendMessage", msg);

    if (threadCreatedNow && messages.length === 0) {
      const mockMsg = {
        threadId,
        from: "admin",
        text: "Hi there, please wait for a while a agent will reply soon",
      };
      socket.emit("sendMessage", mockMsg);
      setThreadCreatedNow(false);
    }

    setMessage("");
    setPendingFiles([]);
    setPendingAudios([]);
    setReplyTo(null);
  };

  const startEdit = (index: number) => {
    const msg = messages[index];
    setMessage(msg.text || "");
    setPendingFiles([]);
    setPendingAudios([]);
    setEditingIndex(index);
    setReplyTo(null);
  };

  useEffect(() => {
  socket.on("threadClosed", ({ threadId: closedId }) => {
    if (closedId === threadId) {
      setMessages([]);
      setReplyTo(null);
      setEditingIndex(null); // if editing
      setPendingFiles([]);
      setPendingAudios([]);
    }
  });

  return () => {
    socket.off("threadClosed");
  };
}, [threadId]);

if (!isLoggedIn) {
  return (
    <div className={clsx(
      "fixed bottom-0 left-0 right-0 z-[9999] md:max-w-[450px] w-full justify-self-center mainBgColor shadow-lg rounded-lg border-2 border-yellow-400 transform transition-all duration-500 ease-in-out",
      isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
    )}>
      <div className="max-w-md mx-auto h-[500px] flex flex-col justify-center px-4 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2">
          <IoMdClose size={22} />
        </button>
{assets?.mainLogo && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
    <Image
      src={assets.mainLogo}
      alt="Background Logo"
      width={300}
      height={300}
      className="object-contain"
    />
  </div>
)}

        {/* Login Prompt */}
        <div className="text-center text-sm text-gray-700 bg-yellow-100 px-4 py-3 rounded shadow">
          🚫 Please log in to start the chat.
        </div>
      </div>
    </div>
  );
}



  return (
    <div className={clsx(
      "fixed bottom-0 left-0 right-0 rounded-lg  mainBgColor z-[9999] md:max-w-[450px] w-full justify-self-center shadow-lg border-2 border-yellow-400 transform transition-all duration-500 ease-in-out",
      isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
    )}>
      <div className="max-w-md mx-auto h-[500px] flex flex-col">
        {/* Header + Search */}
        <div className="flex flex-col px-4 py-2">
          <div className="flex items-center justify-between bg-secondary  px-2 py-1 rounded-lg">
            <div className="font-semibold text-sm text-black">💬 {username} connected with {adminName || "Admin"}</div>
            <button onClick={onClose}><IoMdClose size={22} /></button>
          </div>
          <div className="flex gap-1 mt-2 items-center mainBgColor px-2 py-1 rounded-lg">
            <BiSearchAlt2 />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search messages..."
              className="text-xs flex-1 border rounded px-2 py-1"
            />
            <div className="flex items-center gap-1 text-xs">
              <button disabled={currentMatchIndex === 0} onClick={() => setCurrentMatchIndex(i => Math.max(i - 1, 0))}><AiOutlineArrowUp /></button>
              <span>{matchIndices.length ? currentMatchIndex + 1 : 0} / {matchIndices.length}</span>
              <button disabled={currentMatchIndex >= matchIndices.length - 1} onClick={() => setCurrentMatchIndex(i => Math.min(i + 1, matchIndices.length - 1))}><AiOutlineArrowDown /></button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 w-[92%] self-center
 mainBgColor rounded-lg">
 {assets?.mainLogo && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
    <Image
      src={assets.mainLogo}
      alt="Background Logo"
      width={300}
      height={300}
      className="object-contain"
    />
  </div>
)}

{messages.map((msg, i) => (
  <div
    key={msg.id || i}
    ref={(el) => {
      if (msg.id) messageRefsById.current[msg.id] = el;
      messageRefsByIndex.current[i] = el;
    }}
    className={clsx(
      "mb-2 transition-all duration-300",
      matchIndices.includes(i) && "ring ring-yellow-400"
    )}
    onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
    onTouchEnd={(e) => {
      const deltaX = e.changedTouches[0].clientX - (touchStartX ?? 0);
      if (deltaX > 80) setReplyTo(msg);
    }}
    onMouseDown={(e) => setTouchStartX(e.clientX)}
    onMouseUp={(e) => {
      const deltaX = e.clientX - (touchStartX ?? 0);
      if (deltaX > 80) setReplyTo(msg);
    }}
  >
    <div
      className={clsx(
        "max-w-[80%] px-3 py-2 rounded-lg text-sm",
        msg.from === "user" ? "ml-auto bg-yellow-200" : "mr-auto bg-gray-200"
      )}
    >
      {msg.replyTo && (
  <div
    onClick={() => {
      const originalEl = msg.replyTo?.id && messageRefsById.current[msg.replyTo.id];
      if (originalEl) {
        originalEl.scrollIntoView({ behavior: "smooth", block: "center" });
        originalEl.classList.add("ring", "ring-yellow-400", "animate-pulse");

        setTimeout(() => {
          originalEl.classList.remove("ring", "ring-yellow-400", "animate-pulse");
        }, 2000);
      }
    }}
    className="text-[10px] text-gray-600 border-l-2 pl-2 mb-1 cursor-pointer hover:underline"
  >
    ↪ {msg.replyTo.text || "[Attachment]"}
  </div>
)}



      {msg.text && <div>{msg.text}</div>}

      {msg.files?.map((f, idx) => {
        const isImage = /\.(jpeg|jpg|png)$/i.test(f.name);
        const url = `https://api.bet365all.live/api/v1/chat/file/${f.name}`;
        return (
          <div key={idx} className="mt-1">
            {isImage ? (
              <img src={url} alt="uploaded" className="max-w-[200px] rounded shadow" />
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs break-words underline text-blue-600"
              >
                📎 {f.name}
              </a>
            )}
          </div>
        );
      })}

      {msg.audios?.map((a, idx) => {
        const url = `https://api.bet365all.live/api/v1/chat/file/${a.name}`;
        return <AudioPlayer key={idx} url={url} name={a.name} />;
      })}
    </div>

    <div
      className={clsx(
        "flex gap-3 items-center text-[10px] text-black mt-1",
        msg.from === "user" ? "justify-end" : "justify-start"
      )}
    >
      <span>{new Date(msg.timestamp).toLocaleString()}</span>

      {msg.from === "user" && msg.text ? (
        <button onClick={() => startEdit(i)} className="text-blue-600 text-xs flex items-center gap-1">
          <FaEdit className="text-sm" /> Edit
        </button>
      ) : msg.from === "user" ? (
        <span className="text-gray-300">—</span>
      ) : null}

      {msg.from === "user" && <span>{msg.isRead ? "✅ ✅ Read" : "✅ Sent"}</span>}
    </div>
  </div>
))}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 mainBgColor rounded-lg mt-2 gap-2 w-[92%] self-center
 relative flex flex-col">
          {editingIndex !== null && (
  <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded flex justify-between items-center">
    Editing message
    <button onClick={() => {
      setEditingIndex(null);
      setMessage("");
    }}><IoMdClose size={12} /></button>
  </div>
)}

{replyTo && editingIndex === null && (
  <div className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded flex justify-between items-center">
    Replying to: {replyTo.text || "[Attachment]"}
    <button onClick={() => setReplyTo(null)}><IoMdClose size={12} /></button>
  </div>
)}

          <div className="flex items-center gap-2">
            <button onClick={() => fileInputRef.current?.click()}><FaPaperclip /></button>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              multiple
              accept=".jpeg,.jpg,.png,.pdf,.txt"
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                const allowedTypes = [
                  "image/jpeg", "image/png", "image/jpg",
                  "application/pdf",
                   "text/plain"
                ];
                const formatted = Array.from(files)
  .filter(f => allowedTypes.includes(f.type) && f.size <= 5 * 1024 * 1024) // <= 5MB
  .map(f => {
    const ext = f.name.split('.').pop();
    const base = f.name.replace(/\.[^/.]+$/, "");
    const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
    const customName = `${username}-${base}-${timestamp}.${ext}`;
    return new File([f], customName, { type: f.type });
  });

                setPendingFiles(prev => [...prev, ...formatted]);
                e.target.value = "";
              }}
            />
            <button
              onClick={toggleRecording}
              onMouseDown={() => (pressTimerRef.current = setTimeout(toggleRecording, 300))}
              onMouseUp={() => pressTimerRef.current && clearTimeout(pressTimerRef.current)}
            >
              <FaMicrophone className={clsx(isRecording && "text-red-500 animate-ping")} />
            </button>
            <div className="flex-1 max-h-36 overflow-y-auto border rounded-lg px-2 py-1">
              <div className="flex flex-wrap gap-2 mb-1">
                {pendingFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs max-w-full break-all">
                    📎 {file.name}
                    <button onClick={() => setPendingFiles(pendingFiles.filter((_, i) => i !== idx))}><IoMdClose className="text-red-600 text-sm ml-1" /></button>
                  </div>
                ))}
                {pendingAudios.map((blob, idx) => (
                  <div key={idx} className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                    🎤 {(blob as any).name || "Audio"}
                    <button onClick={() => setPendingAudios(pendingAudios.filter((_, i) => i !== idx))}><IoMdClose className="text-red-600 text-sm ml-1" /></button>
                  </div>
                ))}
                {isUploading && (
  <div className="text-xs text-yellow-600 italic">Uploading...</div>
)}

              </div>
              <textarea
  ref={inputRef}
  className="w-full resize-none text-sm outline-none max-h-32 overflow-y-auto bg-transparent"
  rows={1}
  style={{ height: "auto" }}
  value={message}
  onChange={(e) => {
    setMessage(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }}
  placeholder="Type message..."
/>

            </div>
            <button
              onClick={handleSend}
              disabled={!message.trim() && pendingFiles.length === 0 && pendingAudios.length === 0}
              className={clsx("disabled:opacity-40 disabled:cursor-not-allowed")}
            >
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}