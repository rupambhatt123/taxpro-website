interface BadgeProps {
  text: string;
}

export default function Badge({ text }: BadgeProps) {
  return (
    <span className="inline-block bg-[#E3F6ED] text-[#00A859] text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
      {text}
    </span>
  );
}