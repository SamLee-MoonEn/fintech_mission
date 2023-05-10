interface Props {
    accountNum:string
    deposit: number
    resetDeposit: () => void
    handleDeposit: (e:React.ChangeEvent<HTMLInputElement>) => void
    handleAddDeposit: () => void
}

export default function DepositModal ({accountNum, deposit, resetDeposit, handleDeposit, handleAddDeposit}:Props) {
    
    return (
        <>
        <input type="checkbox" id="addDeposit" className="modal-toggle" />
          <label htmlFor="addDeposit"  onClick={resetDeposit} className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
            <label htmlFor="addDeposit" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={resetDeposit}>✕</label>
            <h3 className="text-lg font-bold text-black mb-4">계좌번호 {accountNum}</h3>
            <div className='ml-auto flex justify-end items-center'>
              <input className='input input-bordered text-black h-10 flex-1' value={deposit} onChange={handleDeposit}></input>
              <p className='ml-4 text-black text-xl flex-grow-0'>원</p>
            </div>
            <label htmlFor='addDeposit' className="btn btn-primary text-xl mt-4 w-full" onClick={handleAddDeposit}>입금</label>
            </label>
          </label>
        </>
        )
}