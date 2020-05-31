import {CaretDownOutlined, UserOutlined} from '@ant-design/icons'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons/lib'
import {Dropdown, Layout, Menu, PageHeader, Spin, Tag} from 'antd'
import getConfig from 'next/config'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {FunctionComponent} from 'react'
import {sideMenu, SideMenuElement} from './sidemenu'
import {useWindowSize} from './use.window.size'
import {clearAuth} from './with.auth'

const { publicRuntimeConfig } = getConfig()

const { SubMenu, ItemGroup } = Menu
const { Header, Content, Sider } = Layout

interface BreadcrumbEntry {
  name: string
  href?: string
  as?: string
}

interface Props {
  loading?: boolean
  padded?: boolean
  style?: any

  selected?: string


  breadcrumbs?: BreadcrumbEntry[]
  title?: string
  subTitle?: string
  extra?: any[]
}

const Structure: FunctionComponent<Props> = (props) => {
  const size = useWindowSize()
  const [userMenu, setUserMenu] = React.useState(false)
  const [open, setOpen] = React.useState<string[]>()
  const [selected, setSelected] = React.useState<string[]>()
  const [sidebar, setSidebar] = React.useState(size.width < 700)
  const router = useRouter()

  React.useEffect(() => {
    if (sidebar !== size.width < 700) {
      setSidebar(size.width < 700)
    }
  }, [size.width])

  React.useEffect(() => {
    if (props.selected) {
      const parts = props.selected.split('.')

      const last = parts.pop()

      if (parts.length > 0) {
        setOpen(parts)
      }

      setSelected([last])
    }
  }, [props.selected])

  const buildMenu = (data: SideMenuElement[]): JSX.Element[] => {
    return data.map((element): JSX.Element => {
      if (element.items && element.items.length > 0) {
        if (element.group) {
          return (
            <ItemGroup
              key={element.key}
              title={(
                <div style={{
                  textTransform: 'uppercase',
                  paddingTop: 16,
                  fontWeight: 'bold',
                  color: '#444'
                }}>
                  {element.icon}
                  {element.name}
                </div>
              )}
            >
              {buildMenu(element.items)}
            </ItemGroup>
          )
        }

        return (
          <SubMenu
            key={element.key}
            title={
              <span>
                {element.icon}
                {element.name}
              </span>
            }
          >
            {buildMenu(element.items)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item
          onClick={(): void => {
            if (element.href) {
              router.push(element.href)
            }
          }}
          key={element.key}
        >
          {element.icon}
          {element.name}
        </Menu.Item>
      )
    })
  }

  const signOut = async (): Promise<void> => {
    await clearAuth()
    router.reload()
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          paddingLeft: 0,
        }}
      >
        <div style={{
          float: 'left',
          color: '#FFF',
          fontSize: 14,
          marginRight: 26,
          fontWeight: 'bold'
        }}>
          {React.createElement(sidebar ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'sidebar-toggle',
            onClick: () => setSidebar(!sidebar),
          })}

          <img src={require('assets/images/logo_white_small.png')} height={30} style={{marginRight: 16}} alt={'OhMyForm'} />
        </div>
        <div style={{float: 'right', display: 'flex', height: '100%'}}>
          <Dropdown
            overlay={(
              <Menu>
                <Menu.Item onClick={() => router.push('/admin/profile')}>Profile</Menu.Item>
                <Menu.Divider/>
                <Menu.Item onClick={signOut}>Logout</Menu.Item>
              </Menu>
            )}
            onVisibleChange={setUserMenu}
            visible={userMenu}
          >
            <a style={{
              color: '#FFF',
              alignItems: 'center',
              display: 'inline-flex',
            }}>
              <UserOutlined style={{fontSize: 24}} />
              <CaretDownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout style={{
        height: '100%',
      }}>
        <Sider
          collapsed={sidebar}
          trigger={null}
          collapsedWidth={0}
          breakpoint={'xs'}
          width={200}
          style={{
            background: '#fff',
            maxHeight: '100%',
            overflow: 'auto',
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={selected}
            onSelect={(s): void => setSelected(s.keyPath)}
            openKeys={open}
            onOpenChange={(open): void => setOpen(open)}
          >
            {buildMenu(sideMenu)}
          </Menu>
          <Menu
            mode="inline"
            selectable={false}
            >
            <Menu.Item
              style={{
                marginTop: 40,
              }}
            >
              Version: <Tag color="gold">{publicRuntimeConfig.version}</Tag>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {props.title && (
            <PageHeader
              title={props.title}
              subTitle={props.subTitle}
              extra={props.extra}
              breadcrumb={{
                routes: [
                  ...(props.breadcrumbs || []).map(b => ({
                    breadcrumbName: b.name,
                    path: ''
                  })),
                  {
                    breadcrumbName: props.title,
                    path: ''
                  }
                ],
                params: props.breadcrumbs,
                itemRender: (route, params: BreadcrumbEntry[], routes, paths) => {
                  if (routes.indexOf(route) === routes.length - 1) {
                    return <span>{route.breadcrumbName}</span>
                  }

                  const entry = params[routes.indexOf(route)]

                  return (
                    <Link
                      href={entry.href}
                      as={entry.as || entry.href}
                    >
                      <a>
                        {entry.name}
                      </a>
                    </Link>
                  )
              }}}
            />
          )}

          <Spin
            spinning={!!props.loading}
          >
            <Content
              style={{
                background: props.padded ? '#fff' : null,
                padding: props.padded ? 24 : 0,
                ...props.style
              }}
            >
              {props.children}
            </Content>
          </Spin>
        </Layout>
      </Layout>
    </Layout>
  )
}

Structure.defaultProps = {
  padded: true,
  style: {},
}

export default Structure
