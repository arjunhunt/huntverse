import { useEffect, useRef, useState } from 'react'
import { Send, Mic, Square, MapPin, Image as ImageIcon } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { quickCommands } from '../data/mockData'
import { Button } from './ui'
import { socket } from '../socket'

export default function ChatPanel({ compact = false }) {
  const chat = useGameStore((s) => s.chat)
  const addChatMessage = useGameStore((s) => s.addChatMessage)
  const user = useGameStore((s) => s.user)
  const [text, setText] = useState('')
  const [recording, setRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const endRef = useRef(null)

  useEffect(() => {
    socket.connect();
    socket.emit('join_room', 'Team Alpha');
    
    socket.on('receive_message', (msg) => {
      const isSelf = user?.username === msg.user;
      addChatMessage({ ...msg, self: isSelf, id: msg._id || Math.random().toString() });
    });

    return () => {
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [user, addChatMessage]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chat.length])

  const submit = (value, audioBase64 = null) => {
    const v = (value ?? text).trim()
    if (!v && !audioBase64) return
    
    socket.emit('send_message', {
      user: user?.username || 'Hunter',
      text: v || '🎙️ Voice Note',
      audio: audioBase64,
      avatar: user?.username?.[0]?.toUpperCase() || 'H',
      room: 'Team Alpha'
    });
    setText('')
  }

  const toggleRecording = async () => {
    if (recording) {
      mediaRecorderRef.current?.stop();
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => submit('', reader.result);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Mic error:', err);
    }
  }

  return (
    <div className={`glass flex flex-col rounded-2xl ${compact ? 'h-80' : 'h-[520px]'}`}>
      <div className="border-b border-white/8 px-4 py-3">
        <p className="font-display text-sm font-bold text-white">Team Alpha</p>
        <p className="text-[11px] text-slate-500">Private team channel</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {(chat || []).map((m) => (
          <div key={m.id} className={`flex gap-2 ${m.self ? 'flex-row-reverse' : ''}`}>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-slate-300">
              {m.avatar}
            </div>
            <div className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${m.self ? 'bg-signal-green/15 text-signal-green' : 'bg-white/5 text-slate-200'}`}>
              {!m.self && <p className="mb-0.5 text-[10px] font-semibold text-slate-500">{m.user}</p>}
              {m.audio ? (
                <audio src={m.audio} controls className="h-8 max-w-[200px]" />
              ) : (
                <p>{m.text}</p>
              )}
              <p className="mt-1 text-[9px] text-slate-500">{m.time}</p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-white/8 px-3 py-2">
        {quickCommands.map((c) => (
          <button key={c} onClick={() => submit(c)} className="focus-ring rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-slate-400 hover:bg-white/10 hover:text-white">
            {c}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-white/8 p-3">
        <button className="focus-ring rounded-lg p-2 text-slate-400 hover:bg-white/10"><ImageIcon size={16} /></button>
        <button className="focus-ring rounded-lg p-2 text-slate-400 hover:bg-white/10"><MapPin size={16} /></button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Message your team…"
          className="focus-ring min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white placeholder:text-slate-500"
        />
        <button 
          onClick={toggleRecording}
          className={`focus-ring rounded-lg p-2 transition-colors ${recording ? 'bg-signal-red/20 text-signal-red' : 'text-slate-400 hover:bg-white/10'}`}
        >
          {recording ? <Square size={16} className="animate-pulse" /> : <Mic size={16} />}
        </button>
        <Button className="!rounded-full !p-2.5" onClick={() => submit()}><Send size={15} /></Button>
      </div>
    </div>
  )
}

