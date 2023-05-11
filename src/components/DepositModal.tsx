interface Props {
  accountNum: string
  depositAmount: number
  resetDeposit: () => void
  handleDepositAmount: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddDeposit: () => void
}

export default function DepositModal({
  accountNum,
  depositAmount,
  resetDeposit,
  handleDepositAmount,
  handleAddDeposit,
}: Props) {
  return (
    <>
      <input type="checkbox" id="addDeposit" className="modal-toggle" />
      <div onClick={resetDeposit} className="modal">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="addDeposit"
            className="btn btn-square btn-outline absolute right-2 top-2"
            onClick={resetDeposit}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-black mb-4">
            계좌번호 {accountNum}
          </h3>
          <div className="ml-auto flex justify-end items-center">
            <input
              className="input input-bordered text-black h-10 flex-1"
              value={depositAmount}
              onChange={handleDepositAmount}
            ></input>
            <p className="ml-4 text-black text-xl flex-grow-0">원</p>
          </div>
          <label
            htmlFor="addDeposit"
            className="btn btn-primary text-xl mt-4 w-full"
            onClick={handleAddDeposit}
          >
            입금
          </label>
        </label>
      </div>
    </>
  )
}
