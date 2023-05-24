export default function ShortCutAddModal() {
  return (
    <>
      <input type="checkbox" id="shortCutAdd" className="modal-toggle" />
      <label htmlFor="shortCutAdd" className="modal">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="shortCutAdd"
            className="btn btn-sm btn-circle bg-primary absolute right-3 top-3"
          >
            ✕
          </label>
          <h3 className="text-3xl font-bold text-center mb-4">카드 추가</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="btn text-xl">계좌 카드</label>
            <label className="btn text-xl">지출 카드</label>
            <label className="btn text-xl">주식 카드</label>
            <label className="btn text-xl">환율 카드</label>
            <label className="btn text-xl">결제 카드</label>
          </div>
        </label>
      </label>
    </>
  )
}
