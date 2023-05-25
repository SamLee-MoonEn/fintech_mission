import AccountShortcutCard from './shortcutCards/AccountShortcutCard'
import ExpenseShortcutCard from './shortcutCards/ExpenseShortcutCard'
import QRShortcutCard from './shortcutCards/QRShortcutCard'

export default function ShortCutCard({
  detailInfo,
  type,
  updateShortCut,
}: {
  detailInfo: string
  type: string
  updateShortCut: () => Promise<void>
}) {
  return (
    <>
      {(() => {
        switch (type) {
          case 'QR':
            return (
              <QRShortcutCard
                accountNum={detailInfo}
                updateAccount={updateShortCut}
              />
            )
          case 'Account':
            return <AccountShortcutCard accountNum={detailInfo} />
          case 'Expense':
            return <ExpenseShortcutCard accountNum={detailInfo} />
          default:
            return (
              <div className="card card-bordered border-2 border-solid border-slate-400 h-36">
                <div className="card-body">
                  <div className="card-title">{detailInfo}</div>
                  <div className=" card-actions">{type}</div>
                </div>
              </div>
            )
        }
      })()}
    </>
  )
}
