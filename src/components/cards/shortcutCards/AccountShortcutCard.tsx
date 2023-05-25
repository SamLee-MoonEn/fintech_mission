import { useState } from 'react'

interface AccountTypes {
  accountNum: string
  balance: number
  password: string
}

export default function AccountShortcutCard({ data }: { data: AccountTypes }) {
  const [accountInfo, setAccountInfo] = useState<AccountTypes>(data)

  return (
    <a
      href="/accountinfo"
      className="btn bg-rose-500 hover:bg-white hover:text-black hover:border-slate-400 hover:border-solid hover:border-1 h-36"
    >
      <div className="block w-full">
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
