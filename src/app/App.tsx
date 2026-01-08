import { DeviceGate } from '@/widgets/device-gate'
import { HomePage } from '@/pages/home'

export function App() {
  return (
    <DeviceGate>
      <HomePage />
    </DeviceGate>
  )
}
