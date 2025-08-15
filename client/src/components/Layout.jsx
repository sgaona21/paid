import '../styles/layout.css';

import Expenses from './Expenses';

const Layout = () => {
    return (
        <main className='layout-container'>
            <section className='dashboard'></section>

            <section className='header'></section>

            <section className='content'>
                <Expenses />
            </section>
        </main>
    )
}

export default Layout;