import { useRef, useEffect } from 'react'

export default function TransferStateModal({
  state,
  handleReset,
}: {
  state: string
  handleReset: () => void
}) {
  const $transferStateModal = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (
      state === 'success' ||
      state === 'wrongPassword' ||
      state === 'noBalance'
    ) {
      if ($transferStateModal.current !== null) {
        $transferStateModal.current.checked = true
      }
    } else {
      if ($transferStateModal.current !== null) {
        $transferStateModal.current.checked = false
      }
    }
  }, [state])

  return (
    <>
      {state === '' ? (
        ''
      ) : (
        <>
          <input
            type="checkbox"
            id={`transfer${state}`}
            className="modal-toggle"
            ref={$transferStateModal}
          />
          <div className="modal">
            <div className=" overflow-visible relative bg-white p-10 rounded-xl">
              <h1 className="text-black text-xl mb-4">
                {state === 'wrongPassword'
                  ? '비밀번호가 틀렸습니다.'
                  : state === 'noBalance'
                  ? '잔액이 부족합니다.'
                  : ''}
              </h1>
              <button
                className="btn btn-primary text-xl w-full"
                onClick={handleReset}
              >
                {state === 'success' ? '송금 완료' : '확인'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
