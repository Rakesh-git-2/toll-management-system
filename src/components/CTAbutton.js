import "./CTAbutton.css";
function CtaButton({ text, style, onClick = null }) {
  return (
    <div>
      <button class="cta" style={style} onClick={(e) => onClick(e)}>
        {text}
      </button>
    </div>
  );
}

export default CtaButton;
