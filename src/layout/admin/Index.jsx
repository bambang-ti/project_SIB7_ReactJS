import { Fragment } from 'react'
import Header from '../../components/admin/Header'
import Sidebar from '../../components/admin/Sidebar'
import Footer from '../../components/admin/Footer'

function Layout({children}){
    return(
        <Fragment>
        <Header />
        <div id="layoutSidenav" style={{width: '215vh'}} >
            <Sidebar />
            <div id="layoutSidenav_content" style={{height: '100px'}}>
                <main>
                    
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    </Fragment>
    )
}
export default Layout