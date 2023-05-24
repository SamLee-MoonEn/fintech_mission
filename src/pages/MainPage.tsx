import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../store/userInfo'
import ShortCutCard from '../components/cards/ShortCutCard'
import ShortCutAddModal from '../components/modals/ShortCutAddModal'

const items: { item: string }[] = [
  { item: 'a' },
  { item: 'b' },
  { item: 'c' },
  { item: 'd' },
  { item: 'e' },
  { item: 'f' },
  { item: 'g' },
  { item: 'g' },
  { item: 'g' },
  { item: 'g' },
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
      <ShortCutAddModal />
    </div>
  )
}

function MainPageCards({ currentItems }: { currentItems: { item: string }[] }) {
  return (
    <>
      <div className=" carousel-item w-full grid grid-cols-2 h-full items-start gap-4 ml-4 mr-4">
        {currentItems.map((v) => {
          return <ShortCutCard itemTitle={v.item} />
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
