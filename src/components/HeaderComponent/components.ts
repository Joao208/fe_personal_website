import { InputHTMLAttributes } from 'react'

export interface ButtonHeaderInterface extends InputHTMLAttributes<HTMLInputElement> {
  active?: boolean
}

export interface HeaderComponentInterface extends InputHTMLAttributes<HTMLInputElement> {
  page: string
  isAbsolute?: boolean
}
