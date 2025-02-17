import Cookie from "js-cookie";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/router';

import { logout } from '../auth';
import Icons from '../UI/icons/index';
import styles from "../../styles/Navigation.module.css";
import styles2 from "../../styles/Dialog.module.css";

export default function MenuDrawer({ 
  navContentRef, 
  handleSetUser,
  user, 
  toggleNavContent,
  closeNavContent,
  loginRef,
  registerRef }) {

  const router = useRouter();
  const currentPage = router.pathname;

  const {  
    restaurantIcon,
    ordersIcon,
    favoritesIcon,
    instantIcon,
    moneyIcon,
    giftIcon,
    promoIcon,
    helpIcon,
    howIcon,
    closeIcon,
    logOutIcon } = Icons;

  return (
    <div ref={navContentRef} className={styles.menuDrawer}>
      <div className={styles.closeIcon} style={{width: "calc(100vw - 40px)"}}>
        <div onClick={closeNavContent} className={styles2["close-modal"]} style={{zIndex: "999", right: "10px", position: "absolute", cursor:"pointer"}}>
          {closeIcon}
        </div>
      </div>
    <div style={{width: "calc(100vw - 40px)", overflowX: "hidden"}}>
      <div className={styles.menuHeader}>
          {user ? (
            <>
            <h5>{user.username || user.email.replace(/@.+/,'')}</h5>
            <a className={styles.accountSettings}>Account settings</a>
            </>
          ) : (
            <div className={styles.menuHeaderOptions}>
              <div 
                className={styles.menuHeaderOption}
                onClick={()=>{registerRef.current.classList.add(styles.showLoginDrawerContainer), toggleNavContent()}}
              >
                Sign up
              </div>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <div 
                className={styles.menuHeaderOption}
                onClick={()=>{loginRef.current.classList.add(styles.showLoginDrawerContainer), toggleNavContent()}}
              >
                Sign in
              </div>
            </div>
          )}
      </div>
      <hr />
      <Link href="/restaurants"><div style={{cursor: "pointer"}} onClick={toggleNavContent} className={styles.menuItem}>{restaurantIcon}<div>Stores</div></div></Link>
      <Link href="/store/account/orders"><div style={{cursor: "pointer"}} onClick={toggleNavContent}  className={styles.menuItem}>{ordersIcon}<div>Your Orders</div></div></Link>
      <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><div style={{cursor: "pointer"}} onClick={toggleNavContent} className={styles.menuItem}>{favoritesIcon}<div>Your Favorites</div></div></Link>
      <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><div style={{cursor: "pointer"}} onClick={toggleNavContent} className={styles.menuItem}>{instantIcon}<div>Serveroo Express</div></div></Link>
      <hr/>
      <div className={styles.menuItem}><h6>Credits and Promos</h6></div>
      <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><div style={{cursor: "pointer"}} onClick={toggleNavContent} className={styles.menuItem}>{moneyIcon}<div style={{ color: "red" }}>Invite friends, get $50!</div></div></Link>
      <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><div style={{cursor: "pointer"}} onClick={toggleNavContent} className={styles.menuItem}>{giftIcon}<div>Buy gift cards</div></div></Link>
      <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><div style={{cursor: "pointer"}} onClick={toggleNavContent} className={styles.menuItem}>{promoIcon}<div>Add Promo or Gift Cards</div></div></Link>
      <hr/>
      <div className={styles.menuItem}><h6>Support</h6></div>
      <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><div style={{cursor: "pointer"}} onClick={toggleNavContent} className={styles.menuItem}>{helpIcon}<div>Help Center</div></div></Link>
      <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><div style={{cursor: "pointer"}} onClick={toggleNavContent} className={styles.menuItem}>{howIcon}<div>How Serveroo Works</div></div></Link>
          {user && user?.provider !== 'google' ? (
              <a
                className={styles.navLink}
                style={{cursor: "pointer"}}
                onClick={() => {
                  logout(currentPage);
                  handleSetUser(null, null);
                  closeNavContent();
                }}
              >
                <div className={styles.menuItem}>{logOutIcon}<div>Log out</div></div>
              </a>
          ) : null}
          {user?.provider === 'google' ? (
              <a
                className={styles.navLink}
                style={{cursor: "pointer"}}
                onClick={() => {
                  signOut();
                  handleSetUser(null, null);
                    //remove token and user cookie
                  Cookie.remove("token");

                  // sync logout between multiple windows
                  window.localStorage.setItem("logout", Date.now().toString());
                  window.localStorage.removeItem("serveroo_user");
                  window.localStorage.removeItem("serveroo_auth_token");

                  closeNavContent();
                }}
              >
                <div className={styles.menuItem}>{logOutIcon}<div>Log out</div></div>
              </a>
          ) : null}
      <hr />
      <div>
        <h6 className={styles.menuFooter}>
          <Link href="/press"><span className={styles.menuFooter} style={{cursor: "pointer"}} onClick={toggleNavContent}>Press</span></Link> · <Link href="https://www.indeed.com/"><span className={styles.menuFooter} style={{cursor: "pointer"}} onClick={toggleNavContent}>Jobs</span></Link> · <Link href="/terms"><span className={styles.menuFooter} style={{cursor: "pointer"}} onClick={toggleNavContent}>Terms</span></Link> · <Link href="/privacy"><span className={styles.menuFooter} style={{cursor: "pointer"}} onClick={toggleNavContent}>Privacy</span></Link>
        </h6>
      </div>
    </div>
  </div>
  )

}
