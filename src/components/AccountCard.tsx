export default function AccountCard() {
  return (
    <div className="card w-8/12 bg-neutral text-primary-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-3xl">계좌번호</h2>
        <p className=" text-right text-2xl">잔액</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary mt-4">Buy Now</button>
        </div>
      </div>
    </div>
  )
}
