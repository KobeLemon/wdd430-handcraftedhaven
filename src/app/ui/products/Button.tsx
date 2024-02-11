'use client'

export default function Button({

  type,

  text,

  disabled,

  children,

  onClickHandler

} : {

  type?: 'submit' | 'button' | 'reset',

  text: string,

  disabled?: boolean,

  children?: JSX.Element,

  onClickHandler?: () => void

} ) {

  return (

    <button className='inline-flex px-8 py-2 bg-orange text-black font-bold rounded-md disabled:opacity-80 transition-opacity duration-300' type={type ?? 'button'} disabled={disabled} onClick={onClickHandler}>

      { children }

      <span>{ text }</span>

    </button>

  )

}