interface accountProps {
  accountNum: string
  balance: number
}

export default function AccountCard({ accountNum, balance }: accountProps) {
  return (
    <div className="card w-full bg-neutral text-primary-content shadow-xl mb-10">
      <div className="card-body">
        <h2 className="card-title text-3xl">계좌번호 {accountNum}</h2>
        <p className=" text-right text-2xl">잔액 {balance} 원</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary text-xl mt-4">송금</button>
        </div>
      </div>
    </div>
  )
}
