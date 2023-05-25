interface AccountTypes {
  accountNum: string
  balance: number
  password: string
}

export default function AccountShortcutCard({
  data,
  removeCard,
}: {
  data: AccountTypes
  removeCard: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const accountInfo: AccountTypes = data
  return (
    <a
      href="/accountinfo"
      className="relative btn bg-rose-500 hover:bg-white hover:text-black hover:border-slate-400 hover:border-solid hover:border-1 h-36"
    >
      <div className=" block w-full">
        <button
          onClick={removeCard}
          className=" btn btn-sm bg-transparent text-transparent text-black border-0 hover:bg-red-400 hover:text-white absolute top-3 right-3"
        >
          X
        </button>
        <div className="mb-4 text-left text-lg">
          계좌번호 {accountInfo?.accountNum}
        </div>
        <div className="text-right text-2xl">
          잔고 {accountInfo?.balance.toLocaleString()}원
        </div>
      </div>
    </a>
  )
}
