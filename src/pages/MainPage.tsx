import { useRecoilValue } from 'recoil'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import React, { useRef, useEffect } from 'react'

import { userState } from '../store/userInfo'
import { getShortcutDataFromFirebase } from '../API/firebaseAuth'
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
  const $container = useRef<HTMLDivElement>(null)
  const $carousel = useRef<HTMLDivElement>(null)

  const queryClient = useQueryClient()

  //useQuery 사용
  const { isLoading, isError, error, data } = useQuery<ShortcutCardDataType>(
    'shortcutCardList',
    () => {
      return getShortcutDataFromFirebase(
        userUid,
      ) as Promise<ShortcutCardDataType>
    },
    { notifyOnChangeProps: ['data'] },
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

  useEffect(() => {
    const container = $container.current
    const carousel = $carousel.current
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      carousel?.scrollBy({
        left: e.deltaY,
        behavior: 'smooth',
      })
    }

    container?.addEventListener('wheel', handleScroll)
    return () => {
      container?.removeEventListener('wheel', handleScroll)
    }
  }, [isLoading])

  // useMudataion을 이용해서 데이터 업데이트 시 서버에서 데이터 받아오기
  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    console.error(error)
    return <div>문제발생</div>
  }

  const currentItems = []
  const itemsKeys: string[][] = []
  if (data) {
    for (let i = 0; i < Math.ceil(Object.values(data).length / 8); i++) {
      currentItems.push(Object.values(data).slice(i * 8, i * 8 + 8))
      itemsKeys.push(Object.keys(data).slice(i * 8, i * 8 + 8))
    }
  }

  return (
    <>
      <div
        ref={$container}
        className=" max-w-full md:max-w-[80%] ml-auto mr-auto flex flex-col justify-center items-center"
      >
        <div
          ref={$carousel}
          className=" carousel w-full max-w-[80%] mt-24 overflow-y-hidden"
        >
          {Object.values(data as ShortcutCardDataType).length % 8 === 0 ? (
            <>
              {currentItems.map(
                (
                  v: { detailInfo: string; shortcutCardType: string }[],
                  idx,
                ) => {
                  return (
                    <MainPageCards
                      currentItems={v}
                      updateShortcut={handleUpdateShorcut}
                      deleteKey={itemsKeys[idx]}
                      key={idx}
                    />
                  )
                },
              )}
              <MainPageCards
                currentItems={[]}
                updateShortcut={handleUpdateShorcut}
                deleteKey={['']}
              />
            </>
          ) : (
            currentItems.map(
              (v: { detailInfo: string; shortcutCardType: string }[], idx) => {
                return (
                  <MainPageCards
                    currentItems={v}
                    updateShortcut={handleUpdateShorcut}
                    deleteKey={itemsKeys[idx]}
                    key={idx}
                  />
                )
              },
            )
          )}
        </div>
        <ShortCutAddModal updateShortcutList={handleUpdateShorcut} />
      </div>
    </>
  )
}

function MainPageCards({
  currentItems,
  updateShortcut,
  deleteKey,
}: {
  currentItems: { detailInfo: string; shortcutCardType: string }[]
  updateShortcut: () => Promise<void>
  deleteKey: string[]
}) {
  return (
    <>
      <div className=" carousel-item w-full grid grid-cols-2 h-full items-start gap-4 ml-4 mr-4">
        {currentItems.map((v, idx) => {
          return (
            <ShortCutCard
              detailInfo={v.detailInfo}
              type={v.shortcutCardType}
              key={idx}
              deleteKey={deleteKey[idx]}
              updateShortcutCard={updateShortcut}
            />
          )
        })}
        {currentItems.length === 8 ? (
          <></>
        ) : (
          <label htmlFor="shortCutAdd" className="btn h-36 bg-neutral">
            <div className="card-body items-center justify-center">
              <div className="card-title text-2xl">카드 추가</div>
              <div className="card-title">+</div>
            </div>
          </label>
        )}
      </div>
    </>
  )
}
