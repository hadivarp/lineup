import React, { useState, useEffect } from 'react';
import './index.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { getCategories } from './utils/request';
import {
    LaptopOutlined,
    CheckCircleTwoTone,
    UserOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import Todo from './Todo';

const { Header, Content, Sider } = Layout;

const CustomMenuItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', margin: '8px 0' }}>
        <div style={{ marginRight: '8px' }}>{icon}</div>
        <div>{text}</div>
    </div>
);

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                const categoriesList = response && response.categories ? response.categories : [];
                setCategories(categoriesList);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const items1: Menu['props']['items'] = ['1', '2', '3'].map((key) => ({
        key,
        label: `Profile ${key}`,
    }));

    const getCategoryIcon = (categoryName: string): React.ReactNode => {
        switch (categoryName.toLowerCase()) {
            case 'user':
                return <CheckCircleTwoTone />;
            case 'activities':
            case 'daily':
                return <CheckCircleTwoTone />;
            default:
                return <CheckCircleTwoTone />;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {categories.map((category) => (
                            <Menu.Item key={String(category.id)}>
                                <CustomMenuItem
                                    icon={getCategoryIcon(category.name)}
                                    text={category.name}
                                />
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    {/*<Breadcrumb style={{ margin: '16px 24px' }}>*/}
                    {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    {/*<Content style={{ margin: '16px 24px' }}>*/}
                    {/*    <div style={{ padding: 24, background: '#fff', minHeight: 280 }}>*/}
                    {/*        <h2>Hi</h2>*/}
                    {/*    </div>*/}
                    {/*</Content>*/}
                    <Todo />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;
