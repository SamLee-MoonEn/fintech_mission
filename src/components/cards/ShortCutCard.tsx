export default function ShortCutCard({ itemTitle }: { itemTitle: string }) {
  return (
    <div className="card bg-blue-300 h-36">
      <div className="card-body">
        <div className="card-title">{itemTitle}</div>
      </div>
    </div>
  )
}