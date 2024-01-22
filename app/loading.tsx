import LoaderSpinner from '@/components/LoaderSpinner'

function loading() {
  return (
    <div className="flex items-center justify-center p-10">
      <LoaderSpinner />
    </div>
  )
}

export default loading
