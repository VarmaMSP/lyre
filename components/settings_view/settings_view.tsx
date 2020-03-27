import { User } from 'models'

export interface StateToProps {
  user: User
}

export interface DispatchToProps {
  signOutUser: () => void
}

const SettingsView: React.FC<StateToProps & DispatchToProps> = (props) => {
  const { user, signOutUser } = props

  return (
    <div>
      <h1 className="pt-3 text-xl tracking-wide font-semibold">{'Settings'}</h1>
      <hr className="mt-3" />

      <div className="mt-10 tracking-wide">
        <span className="text-sm text-gray-800">{'username :'}</span>
        <span className="text-lg text-gray-900 ml-3">{user.name}</span>
      </div>
      <div className="mt-2 tracking-wide">
        <span className="text-sm text-gray-800">{'email :'}</span>
        <span className="text-lg text-gray-900 ml-10">{user.email}</span>
      </div>

      <div className="mt-10 px-14" style={{ width: '18rem' }}>
        <button
          className="w-full py-1 text-sm text-gray-200 font-bold tracking-wide bg-red-600 rounded-lg cursor-pointer"
          onClick={signOutUser}
        >
          SIGN OUT
        </button>
      </div>
    </div>
  )
}

export default SettingsView
