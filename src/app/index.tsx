import React, { Suspense } from 'react'
import ComponentAppRoute from '../route'
// import Copyright from '@pages/Copyright'
import useEnhancedReducer from '../pages/Component/UseEnhancedReducer'
import reducer, { Context, initialState } from '../store'
import './index.less'

const App: React.FC = () => {
  const [state, dispatch] = useEnhancedReducer(reducer, initialState)
  return <Suspense fallback='加载中...'>
    <Context.Provider value={{ state, dispatch }}>
      <div className='app-wrapper'>
        <ComponentAppRoute />
      </div>
    </Context.Provider>
  </Suspense>
}
export default App
