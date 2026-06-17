import { useEffect, useRef, useState } from "react";
import "./tarot-room.css";

export interface RoomMessage {
  id: string;
  role: "user" | "hint";
  text: string;
}

export interface TarotRoomProps {
  /** Seed thread. */
  initialMessages?: RoomMessage[];
  /** Replace with your real Ask Hint call; should resolve Hint's reply text. */
  onAsk?: (prompt: string) => Promise<string>;
  /** Optional title shown in the room header. */
  title?: string;
}

const SEED: RoomMessage[] = [
  { id: "u1", role: "user", text: "I keep avoiding a message I should send. Why?" },
  {
    id: "h1",
    role: "hint",
    text: "Something you said earlier this week is still standing in the room. You already know the shape of it — you just haven't named it out loud.",
  },
];

/**
 * Tarot Room — the immersive, candlelit private space. An arched portal,
 * a slow ambient thread, and a pinned input. Drop a real Ask Hint handler
 * into onAsk; the canned reply is only a fallback for the demo.
 */
export function TarotRoom({ initialMessages = SEED, onAsk, title = "Tarot Room" }: TarotRoomProps) {
  const [messages, setMessages] = useState<RoomMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  const send = async () => {
    const prompt = draft.trim();
    if (!prompt || thinking) return;
    const userMsg: RoomMessage = { id: `u${Date.now()}`, role: "user", text: prompt };
    setMessages((m) => [...m, userMsg]);
    setDraft("");
    setThinking(true);
    try {
      const reply = onAsk
        ? await onAsk(prompt)
        : "The room is listening. Sit with it a moment — the answer is closer than it feels.";
      setMessages((m) => [...m, { id: `h${Date.now()}`, role: "hint", text: reply }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="hint-room">
      <div className="hint-room__glow" aria-hidden />
      <div className="hint-room__portal">
        <header className="hint-room__head">
          <span className="hint-room__orb" aria-hidden />
          <div>
            <p className="hint-room__title">{title}</p>
            <p className="hint-room__status">{thinking ? "reading…" : "listening · just now"}</p>
          </div>
        </header>

        <div className="hint-room__thread" ref={threadRef}>
          {messages.map((m) => (
            <div key={m.id} className={`hint-room__bubble hint-room__bubble--${m.role}`}>
              {m.text}
            </div>
          ))}
          {thinking && (
            <div className="hint-room__bubble hint-room__bubble--hint hint-room__typing">
              <span /> <span /> <span />
            </div>
          )}
        </div>

        <form
          className="hint-room__input"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Say it, or just sit with it…"
            aria-label="Ask Hint"
          />
          <button type="submit" aria-label="Send" disabled={!draft.trim() || thinking}>
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}
