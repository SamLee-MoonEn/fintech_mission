import { useRecoilValue } from 'recoil'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { userState } from '../store/userInfo'
import {
  getAccountInfo,
  getShortcutDataFromFirebase,
} from '../helper/firebaseAuth'
import ShortCutCard from '../components/cards/ShortCutCard'
import ShortCutAddModal from '../components/modals/ShortCutAddModal'

interface ShortcutCardType {
  detailInfo: string
  shortcutCardType: string
}

interface ShortcutCardDataType {
  [key: string]: ShortcutCardType
}

export default function MainPage() {
  const userUid = useRecoilValue(userState)

  const queryClient = useQueryClient()

  //useQuery 사용
  const { isLoading, isError, error, data } = useQuery<ShortcutCardDataType>(
    'shortcutCardList',
    () => {
      return getShortcutDataFromFirebase(
        userUid,
      ) as Promise<ShortcutCardDataType>
    },
  )
  // useMudataion을 이용해서 데이터 업데이트 시 서버에서 데이터 받아오기
  const updateShortcutDataMutation = useMutation(getShortcutDataFromFirebase, {
    onSuccess: () => {
      queryClient.invalidateQueries('shortcutCardList')
    },
  })

  const handleUpdateShorcut = async () => {
    updateShortcutDataMutation.mutate(userUid)
  }

  // useMudataion을 이용해서 데이터 업데이트 시 서버에서 데이터 받아오기
  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    console.error(error)
    return <div>문제발생</div>
  }

  const currentItems = []

  if (data) {
    for (let i = 0; i < Math.ceil(Object.values(data).length / 8); i++) {
      currentItems.push(Object.values(data).slice(i * 8, i * 8 + 8))
    }
  }

  return (
    <div className=" max-w-full md:max-w-[80%] ml-auto mr-auto flex justify-center items-center">
      <div className=" carousel w-full max-w-[80%] mt-24">
        {Object.values(data as ShortcutCardDataType).length % 8 === 0 ? (
          <>
            {currentItems.map(
              (v: { detailInfo: string; shortcutCardType: string }[]) => {
                return (
                  <MainPageCards
                    currentItems={v}
                    updateShortcut={handleUpdateShorcut}
                  />
                )
              },
            )}
            <MainPageCards
              currentItems={[]}
              updateShortcut={handleUpdateShorcut}
            />
          </>
        ) : (
          currentItems.map(
            (v: { detailInfo: string; shortcutCardType: string }[]) => {
              return (
                <MainPageCards
                  currentItems={v}
                  updateShortcut={handleUpdateShorcut}
                />
              )
            },
          )
        )}
      </div>
      <ShortCutAddModal updateShortcutList={handleUpdateShorcut} />
    </div>
  )
}

function MainPageCards({
  currentItems,
  updateShortcut,
}: {
  currentItems: { detailInfo: string; shortcutCardType: string }[]
  updateShortcut: () => Promise<void>
}) {
  return (
    <>
      <div className=" carousel-item w-full grid grid-cols-2 h-full items-start gap-4 ml-4 mr-4">
        {currentItems.map((v) => {
          return (
            <ShortCutCard
              detailInfo={v.detailInfo}
              type={v.shortcutCardType}
              updateShortCut={updateShortcut}
            />
          )
        })}
        {currentItems.length === 8 ? (
          <></>
        ) : (
          <label htmlFor="shortCutAdd" className="card btn h-36 bg-neutral">
            <div className="card-body items-center justify-center">
              <div className="card-title">카드 추가</div>
              <div className="card-title">+</div>
            </div>
          </label>
        )}
      </div>
    </>
  )
}
