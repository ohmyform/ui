import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons/lib'
import { Dropdown, Layout, Menu, PageHeader, Select, Spin, Tag } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { CSSProperties, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'
import { sideMenu, SideMenuElement } from './sidemenu'
import { useWindowSize } from './use.window.size'
import { clearAuth } from './with.auth'

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
  style?: CSSProperties

  selected?: string

  breadcrumbs?: BreadcrumbEntry[]
  title?: string
  subTitle?: string
  extra?: JSX.Element[]
}

const Structure: FunctionComponent<Props> = (props) => {
  const { t, i18n } = useTranslation()
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
    return data.map(
      (element): JSX.Element => {
        if (element.items && element.items.length > 0) {
          if (element.group) {
            return (
              <ItemGroup
                key={element.key}
                title={
                  <div
                    style={{
                      textTransform: 'uppercase',
                      paddingTop: 16,
                      fontWeight: 'bold',
                      color: '#444',
                    }}
                  >
                    {element.icon}
                    {element.name}
                  </div>
                }
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
      }
    )
  }

  const signOut = async (): Promise<void> => {
    await clearAuth()
    router.reload()
  }

  return (
    <Layout style={{ height: '100vh' }} className={'admin'}>
      <Header
        style={{
          paddingLeft: 0,
        }}
      >
        <div
          style={{
            float: 'left',
            color: '#FFF',
            fontSize: 14,
            marginRight: 26,
            fontWeight: 'bold',
          }}
        >
          {React.createElement(sidebar ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'sidebar-toggle',
            onClick: () => setSidebar(!sidebar),
          })}

          <img
            src={require('assets/images/logo_white_small.png')}
            height={30}
            style={{ marginRight: 16 }}
            alt={'OhMyForm'}
          />
        </div>
        <div style={{ float: 'right', display: 'flex', height: '100%' }}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => router.push('/admin/profile')}>Profile</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={signOut}>Logout</Menu.Item>
              </Menu>
            }
            onVisibleChange={setUserMenu}
            visible={userMenu}
          >
            <div
              style={{
                color: '#FFF',
                alignItems: 'center',
                display: 'inline-flex',
              }}
            >
              <UserOutlined style={{ fontSize: 24 }} />
              <CaretDownOutlined />
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout
        style={{
          height: '100%',
        }}
      >
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
          className={'sidemenu'}
        >
          <Menu
            mode="inline"
            style={{ flex: 1 }}
            defaultSelectedKeys={['1']}
            selectedKeys={selected}
            onSelect={(s): void => setSelected(s.keyPath)}
            openKeys={open}
            onOpenChange={(open): void => setOpen(open)}
          >
            {buildMenu(sideMenu)}
          </Menu>
          <Menu mode="inline" selectable={false}>
            <Menu.Item className={'language-selector'}>
              <Select
                bordered={false}
                value={i18n.language.replace(/-.*/, '')}
                onChange={(next) => i18n.changeLanguage(next)}
                style={{
                  width: '100%',
                }}
              >
                {languages.map((language) => (
                  <Select.Option value={language} key={language}>
                    {t(`language:${language}`)}
                  </Select.Option>
                ))}
              </Select>
            </Menu.Item>
            <Menu.Item>
              Version: <Tag color="gold">{process.env.version}</Tag>
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
                  ...(props.breadcrumbs || []).map((b) => ({
                    breadcrumbName: b.name,
                    path: '',
                  })),
                  {
                    breadcrumbName: props.title,
                    path: '',
                  },
                ],
                params: props.breadcrumbs,
                itemRender(route, params: BreadcrumbEntry[], routes) {
                  if (routes.indexOf(route) === routes.length - 1) {
                    return <span>{route.breadcrumbName}</span>
                  }

                  const entry = params[routes.indexOf(route)]

                  return (
                    <Link href={entry.href} as={entry.as || entry.href}>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a>{entry.name}</a>
                    </Link>
                  )
                },
              }}
            />
          )}

          <Spin spinning={!!props.loading}>
            <Content
              style={{
                background: props.padded ? '#fff' : null,
                padding: props.padded ? 24 : 0,
                ...props.style,
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
