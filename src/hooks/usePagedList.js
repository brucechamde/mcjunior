import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

// Pages a list using ?page=N in the address, so a page can be shared and survives refresh.
// Out-of-range or invalid page numbers are clamped.
export function usePagedList(items, pageSize, { onChange } = {}) {
  const [params, setParams] = useSearchParams()
  const gridRef = useRef(null)

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const requested = Number.parseInt(params.get('page') ?? '1', 10)
  const page = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), pageCount) : 1
  const pageItems = items.slice((page - 1) * pageSize, page * pageSize)

  const goToPage = (n) => {
    onChange?.()
    setParams(n === 1 ? {} : { page: String(n) })
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { page, pageCount, pageItems, goToPage, gridRef }
}
