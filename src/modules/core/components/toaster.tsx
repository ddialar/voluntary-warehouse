import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * NOTE: Styling
 *
 * In order to set the success bar and icon colors like the main orange one, the library styles must be rewriten.
 *
 * To do that, it's needed to insert, into the 'body' element defined in the src/view/styles/global.css file, the next variables:
 *
 * --toastify-icon-color-success: #efb300;
 * --toastify-color-progress-success: #efb300;
 *
 * NOTE: Testing
 *
 * Due to Jest is not able to handle CSS files, in order to avoid problems running Jest we have to:
 * 1 - Create the jest.css.stub.ts files with the next content: export {}
 * 2 - Edit the jest.config.ts file, and set the moduleNameMapper field like next:
 * moduleNameMapper: {
 *   ...moduleNameMapper,
 *   '^.+\\.(css)$': '<rootDir>/jest.css.stub.ts' <-- This line is the key.
 * }
 *
 * Note: Delay in update methods
 *
 * In development, due to the request is resolved too quick, when the toaster moves from loading to resolved, the updated version of the
 * toaster is loaded so it's blocked without options to be closed, even clicking on it.
 *
 * The pragmatic solution to avoid this behaviour is to apply a delay of 50ms, taken by the second toaster to be displayed.
 */

type ToastId = string | number

const loading = (message: string) => toast.loading(message)
const success = (toastId: ToastId, message: string) => toast.update(toastId, { render: message, type: 'success', isLoading: false, autoClose: 2000, delay: 50 })
const error = (toastId: ToastId, message: string) => toast.update(toastId, { render: message, type: 'error', isLoading: false, autoClose: 3000, delay: 50 })
const directError = (message: string) => toast.error(message, { isLoading: false, autoClose: 5000, delay: 50 })

const ToasterContainer = () => (
  <ToastContainer
    position='bottom-right'
    autoClose={1}
    hideProgressBar={false}
    newestOnTop
    closeOnClick={true}
    rtl
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover={false}
    theme='dark'
    transition={Flip}
  />
)

export const toaster = {
  ToasterContainer,
  loading,
  success,
  error,
  directError
}