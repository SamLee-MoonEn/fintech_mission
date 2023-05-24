import { useRecoilValue } from 'recoil'

import { userState } from '../../store/userInfo'
import {
  getAccountInfo,
  setShortcutDataToFirebase,
} from '../../helper/firebaseAuth'
import { useEffect, useState } from 'react'

export default function ShortCutAddModal({
  updateShortcutList,
}: {
  updateShortcutList: () => Promise<void>
}) {
  const userUid = useRecoilValue(userState)

  return (
    <>
      <input type="checkbox" id="shortCutAdd" className="modal-toggle" />
      <div className="modal overflow-visible">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="shortCutAdd"
            className="btn btn-sm btn-circle absolute right-3 top-3"
          >
            ✕
          </label>
          <h3 className="text-3xl font-bold text-center mb-4">카드 추가</h3>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="addAccountShortcutCard" className="btn text-xl">
              계좌 카드
            </label>
            <label htmlFor="addExpenseShortcutCard" className="btn text-xl">
              지출 카드
            </label>
            <label className="btn text-xl">주식 카드</label>
            <label className="btn text-xl">환율 카드</label>
            <label htmlFor="addQRShortcutCard" className="btn text-xl">
              결제 카드
            </label>
          </div>
        </label>
      </div>
      <AddAccountShortcutCard
        userUid={userUid}
        updateShortcutList={updateShortcutList}
      />
      <AddExpenseShortcutCard
        userUid={userUid}
        updateShortcutList={updateShortcutList}
      />
      <AddQRhortcutCard
        userUid={userUid}
        updateShortcutList={updateShortcutList}
      />
    </>
  )
}

interface AccountTypes {
  accountNum: string
  balance: number
  password: string
}

function AddAccountShortcutCard({
  userUid,
  updateShortcutList,
}: {
  userUid: string
  updateShortcutList: () => Promise<void>
}) {
  const [accountInfo, setAccountInfo] = useState<AccountTypes[]>()
  const [selectedAccountNum, setSelectedAccountNum] = useState<string>()

  const handleGetAccountInfo = async () => {
    const temp = await getAccountInfo(userUid)
    setAccountInfo(Object.values(temp))
  }
  const handlesetSelectedAccountNum = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedAccountNum(e.target.value)
  }
  const handleAddShortCutAccountCard = () => {
    if (!selectedAccountNum) {
      alert('계좌번호를 선택해주세요.')
      return
    }
    setShortcutDataToFirebase(userUid, 'Account', selectedAccountNum)
    updateShortcutList()
  }
  useEffect(() => {
    handleGetAccountInfo()
  }, [])
  return (
    <>
      <input
        type="checkbox"
        id="addAccountShortcutCard"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box flex flex-col items-center">
          <h1 className="font-bold text-3xl w-full text-center">계좌 카드</h1>
          <label
            htmlFor="addAccountShortcutCard"
            className="btn btn-sm btn-circle absolute right-3 top-3"
          >
            ✕
          </label>
          <div className="divider"></div>
          <h3 className="font-bold text-xl mb-4">
            카드로 추가할 계좌를 선택해 주세요.
          </h3>
          <form>
            <select onChange={handlesetSelectedAccountNum}>
              <option value="default" hidden selected disabled>
                계좌번호
              </option>
              {accountInfo?.map((v) => {
                return <option value={v.accountNum}>{v.accountNum}</option>
              })}
            </select>
          </form>
          <div className="modal-action">
            <label
              onClick={handleAddShortCutAccountCard}
              htmlFor="addAccountShortcutCard"
              className="btn"
            >
              카드 추가
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

function AddExpenseShortcutCard({
  userUid,
  updateShortcutList,
}: {
  userUid: string
  updateShortcutList: () => Promise<void>
}) {
  const [accountInfo, setAccountInfo] = useState<AccountTypes[]>()
  const [selectedAccountNum, setSelectedAccountNum] = useState<string>()

  const handleGetAccountInfo = async () => {
    const temp = await getAccountInfo(userUid)
    setAccountInfo(Object.values(temp))
  }
  const handlesetSelectedAccountNum = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedAccountNum(e.target.value)
  }

  const handleAddShortCutExpenseCard = () => {
    if (!selectedAccountNum) {
      alert('계좌번호를 선택해주세요.')
      return
    }
    setShortcutDataToFirebase(userUid, 'Expense', selectedAccountNum)
    updateShortcutList()
  }

  useEffect(() => {
    handleGetAccountInfo()
  }, [])
  return (
    <>
      <input
        type="checkbox"
        id="addExpenseShortcutCard"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box flex flex-col items-center">
          <h1 className="font-bold text-3xl w-full text-center">지출 카드</h1>
          <label
            htmlFor="addExpenseShortcutCard"
            className="btn btn-sm btn-circle absolute right-3 top-3"
          >
            ✕
          </label>
          <div className="divider"></div>
          <h3 className="font-bold text-xl mb-4">
            카드로 추가할 계좌를 선택해 주세요.
          </h3>
          <form>
            <select onChange={handlesetSelectedAccountNum}>
              <option value="default" hidden selected disabled>
                계좌번호
              </option>
              {accountInfo?.map((v) => {
                return <option value={v.accountNum}>{v.accountNum}</option>
              })}
            </select>
          </form>
          <div className="modal-action">
            <label
              onClick={handleAddShortCutExpenseCard}
              htmlFor="addExpenseShortcutCard"
              className="btn"
            >
              카드 추가
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
function AddQRhortcutCard({
  userUid,
  updateShortcutList,
}: {
  userUid: string
  updateShortcutList: () => Promise<void>
}) {
  const [accountInfo, setAccountInfo] = useState<AccountTypes[]>()
  const [selectedAccountNum, setSelectedAccountNum] = useState<string>()

  const handleGetAccountInfo = async () => {
    const temp = await getAccountInfo(userUid)
    setAccountInfo(Object.values(temp))
  }
  const handlesetSelectedAccountNum = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedAccountNum(e.target.value)
  }

  const handleAddShortCutExpenseCard = () => {
    if (!selectedAccountNum) {
      alert('계좌번호를 선택해주세요.')
      return
    }
    setShortcutDataToFirebase(userUid, 'QR', selectedAccountNum)
    updateShortcutList()
  }

  useEffect(() => {
    handleGetAccountInfo()
  }, [])
  return (
    <>
      <input type="checkbox" id="addQRShortcutCard" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-center">
          <h1 className="font-bold text-3xl w-full text-center">지출 카드</h1>
          <label
            htmlFor="addQRShortcutCard"
            className="btn btn-sm btn-circle absolute right-3 top-3"
          >
            ✕
          </label>
          <div className="divider"></div>
          <h3 className="font-bold text-xl mb-4">
            카드로 추가할 계좌를 선택해 주세요.
          </h3>
          <form>
            <select onChange={handlesetSelectedAccountNum}>
              <option value="default" hidden selected disabled>
                계좌번호
              </option>
              {accountInfo?.map((v) => {
                return <option value={v.accountNum}>{v.accountNum}</option>
              })}
            </select>
          </form>
          <div className="modal-action">
            <label
              onClick={handleAddShortCutExpenseCard}
              htmlFor="addQRShortcutCard"
              className="btn"
            >
              카드 추가
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
