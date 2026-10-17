// 외부 링크: 새 탭으로 열고, 인쇄할 때는 CSS 로 주소를 함께 출력한다.
export default function Ext({ href, children }) {
  return (
    <a className="ext" href={href} target="_blank" rel="noopener noreferrer">
      {children || href}
      <span className="sr-only"> (새 탭에서 열림)</span>
    </a>
  )
}
