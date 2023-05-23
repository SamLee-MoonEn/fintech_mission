import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../store/userInfo'

const items: { item: string }[] = [
  { item: 'a' },
  { item: 'b' },
  { item: 'c' },
  { item: 'd' },
  { item: 'e' },
  { item: 'f' },
  { item: 'g' },
]

export default function MainPage() {
  const userUid = useRecoilValue(userState)
  const currentItems = []

  for (let i = 0; i < Math.ceil(items.length / 8); i++) {
    currentItems.push(items.slice(i * 8, i * 8 + 8))
  }

  return (
    <div className=" max-w-full md:max-w-[80%] ml-auto mr-auto flex justify-center items-center">
      <div className=" carousel w-full max-w-[80%] mt-24">
        {items.length % 8 === 0 ? (
          <>
            {currentItems.map((v) => {
              return <MainPageCards currentItems={v} />
            })}
            <MainPageCards currentItems={[]} />
          </>
        ) : (
          currentItems.map((v) => {
            return <MainPageCards currentItems={v} />
          })
        )}
      </div>
    </div>
  )
}

function ShotCutCard({ itemTitle }: { itemTitle: string }) {
  return (
    <div className="card bg-blue-300 h-36">
      <div className="card-body">
        <div className="card-title">{itemTitle}</div>
      </div>
    </div>
  )
}

function MainPageCards({ currentItems }: { currentItems: { item: string }[] }) {
  return (
    <>
      <div className=" carousel-item w-full grid grid-cols-2 gap-4 ml-4 mr-4">
        {currentItems.map((v) => {
          return <ShotCutCard itemTitle={v.item} />
        })}
        {currentItems.length === 8 ? (
          <></>
        ) : (
          <label className="card btn h-36 bg-neutral">
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
