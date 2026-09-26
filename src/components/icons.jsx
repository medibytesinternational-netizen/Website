import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Mic,
  Play,
  FileText,
  Check,
  Menu,
  ShieldCheck,
  Languages,
  Cloud,
  Server,
  AudioLines,
  ScanLine,
  LockKeyhole,
  Stethoscope,
  Layers,
  Pencil,
  Plus,
} from 'lucide-react';

const map = {
  activity: Activity,
  'arrow-up-right': ArrowUpRight,
  'arrow-down-right': ArrowDownRight,
  'arrow-right': ArrowRight,
  mic: Mic,
  play: Play,
  'file-text': FileText,
  check: Check,
  menu: Menu,
  'shield-check': ShieldCheck,
  languages: Languages,
  cloud: Cloud,
  server: Server,
  'audio-lines': AudioLines,
  'scan-line': ScanLine,
  'lock-keyhole': LockKeyhole,
  stethoscope: Stethoscope,
  layers: Layers,
  pencil: Pencil,
  plus: Plus,
};

export function Icon({ name, className }) {
  const C = map[name] ?? Activity;
  return <C className={className} aria-hidden="true" />;
}

export function Waveform({ count = 65, className = 'waveform' }) {
  const bars = Array.from({ length: count }, (_, i) => ({
    h: 12 + (Math.sin(i * 1.7) + 1) * 15 + (Math.sin(i * 0.43) + 1) * 17,
  }));
  return (
    <div className={className} aria-hidden="true">
      {bars.map((b, i) => (
        <span key={i} style={{ '--bar': `${b.h}px` }} />
      ))}
    </div>
  );
}
