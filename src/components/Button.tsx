export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {}

export function Button({ type, ...restProps }: ButtonProps): JSX.Element {
  return (
    <button
      type={type ?? 'button'}
      className="px-4 py-2 min-w-[120px] rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring transition-colors"
      {...restProps}
    />
  )
}
