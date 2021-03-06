import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import './App.css'
import CompilerFirstStage from 'components/CompilerFirstStage'
import { ROUTINGS } from 'constants/routing'
import CodeMirrorComponent from 'components/Codemirror'
import MainContextProvider from 'contexts'
import CompilerSecondStage from 'components/CompilerSecondStage'
import { TealButton } from 'components/Buttons'
import DrawerItem from 'components/DrawerItem'
import CPU from 'components/CPU'
import VmSimulator from 'components/VmSimulator'
import Assembler from 'components/Assembler'
import AssemblerSecondPass from 'components/Assembler/SecondPass'

function App () {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => setVisible(true)

  const closeDrawer = () => setVisible(false)

  return (
    <div className='App'>
      <TealButton
        className='navigationDdrawerButton'
        style={{ textAlign: 'center' }}
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />
      <MainContextProvider>
        <Switch>
          <Route exact path={ROUTINGS.MAIN} component={CodeMirrorComponent} />
          <Route path={ROUTINGS.COMPILER_FIRST_STAGE} component={CompilerFirstStage} />
          <Route path={ROUTINGS.COMPILER_SECOND_STAGE} component={CompilerSecondStage} />
          <Route path={ROUTINGS.CPU} component={CPU} />
          <Route path={ROUTINGS.VM_TRANSLATOR} component={VmSimulator} />
          <Route path={ROUTINGS.ASSEMBLER} component={Assembler} />
          <Route path={ROUTINGS.ASSEMBLER_SECOND_PASS} component={AssemblerSecondPass} />
        </Switch>
      </MainContextProvider>
      <Drawer
        placement='left'
        visible={visible}
        closable={false}
        onClose={closeDrawer}
      >
        <Link onClick={closeDrawer} to={ROUTINGS.MAIN}><DrawerItem bg='white' color='black' text='Editor' /></Link>
        <Link onClick={closeDrawer} to={ROUTINGS.COMPILER_FIRST_STAGE}><DrawerItem bg='white' color='black' text='Compiler I' /></Link>
        <Link onClick={closeDrawer} to={ROUTINGS.COMPILER_SECOND_STAGE}><DrawerItem bg='white' color='black' text='Compiler II' /></Link>
        <Link onClick={closeDrawer} to={ROUTINGS.VM_TRANSLATOR}><DrawerItem bg='white' color='black' text='VM Translator' /></Link>
        <Link onClick={closeDrawer} to={ROUTINGS.ASSEMBLER}><DrawerItem bg='white' color='black' text='Assembler' /></Link>
        <Link onClick={closeDrawer} to={ROUTINGS.ASSEMBLER_SECOND_PASS}><DrawerItem bg='white' color='black' text='Assembler II' /></Link>
        <Link onClick={closeDrawer} to={ROUTINGS.CPU}><DrawerItem bg='white' color='black' text='CPU' /></Link>
      </Drawer>
    </div>
  )
}

export default App
