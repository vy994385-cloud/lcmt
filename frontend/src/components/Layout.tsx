import Navbar from "./Navbar"
import "./Layout.css"


type LayoutProps = {
  children: React.ReactNode
}


function Layout({ children }: LayoutProps) {


  return (

    <div className="app-layout">


      <Navbar />


      <main className="page-content">

        {children}

      </main>


    </div>

  )

}


export default Layout