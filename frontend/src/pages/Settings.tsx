import {
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Lock,
  Ban,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  
  Smartphone,
  Users
} from "lucide-react"

import {
  Link,
  useNavigate
} from "react-router-dom"

import Layout from "../components/Layout"

import "./Settings.css"

function Settings(){

  const navigate = useNavigate()

  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )

  function logout(){

    localStorage.removeItem("user")
    localStorage.removeItem("token")

    navigate("/login")

  }

  const sections=[

    {

      title:"Account",

      items:[

        {
          title:"Edit Profile",
          desc:"Update bio, interests and profile details",
          icon:<User size={20}/>,
          path:"/profile/edit"
        },

        {
          title:"Privacy",
          desc:"Who can discover and contact you",
          icon:<Shield size={20}/>,
          path:"/privacy"
        },

        {
          title:"Blocked People",
          desc:"Manage blocked accounts",
          icon:<Ban size={20}/>,
          path:"/blocked"
        }

      ]

    },

    {

      title:"Experience",

      items:[

        {
          title:"Notifications",
          desc:"Messages, communities and updates",
          icon:<Bell size={20}/>,
          path:"/notification-settings"
        },

        {
          title:"Appearance",
          desc:"Theme and display preferences",
          icon:<Palette size={20}/>,
          path:"/appearance"
        },

        {
          title:"Language",
          desc:"Choose your preferred language",
          icon:<Globe size={20}/>,
          path:"/language"
        }

      ]

    },

    {

      title:"Security",

      items:[

        {
          title:"Password & Security",
          desc:"Protect your account",
          icon:<Lock size={20}/>,
          path:"/security"
        },

        {
          title:"Connected Devices",
          desc:"Review active sessions",
          icon:<Smartphone size={20}/>,
          path:"/devices"
        }

      ]

    },

    {

      title:"Support",

      items:[

        {
          title:"Help Centre",
          desc:"FAQs and support",
          icon:<HelpCircle size={20}/>,
          path:"/help"
        },

        {
          title:"Community Guidelines",
          desc:"Keep LCMT safe and welcoming",
          icon:<Users size={20}/>,
          path:"/guidelines"
        },

        {
          title:"About LCMT",
          desc:"Version and platform information",
          icon:<Info size={20}/>,
          path:"/about"
        }

      ]

    }

  ]

  return(

    <Layout>

      <main className="settings-page">

        <div className="settings-hero">

          <img
            src={
              user.image ||
              "https://i.pravatar.cc/150"
            }
            alt=""
          />

          <div>

            <h1>

              {user.name || "Your Account"}

            </h1>

            <p>

              Manage your account, privacy and experience.

            </p>

          </div>

        </div>

        {

          sections.map(section=>(

            <section
              key={section.title}
              className="settings-section"
            >

              <h2>

                {section.title}

              </h2>

              <div className="settings-card">

                {

                  section.items.map(item=>(

                    <Link

                      key={item.title}

                      to={item.path}

                      className="settings-option"

                    >

                      <div className="settings-icon">

                        {item.icon}

                      </div>

                      <div className="settings-text">

                        <h3>

                          {item.title}

                        </h3>

                        <p>

                          {item.desc}

                        </p>

                      </div>

                      <ChevronRight
                        size={18}
                      />

                    </Link>

                  ))

                }

              </div>

            </section>

          ))

        }

        <button

          className="logout-button"

          onClick={logout}

        >

          <LogOut size={18}/>

          Logout

        </button>

      </main>

    </Layout>

  )

}

export default Settings