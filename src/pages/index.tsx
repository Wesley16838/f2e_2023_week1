import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/pages/home.module.scss'
import Button from '@/components/Button';
import { ButtonTheme } from '@/constants/enum';
import { images } from '@/constants/constant';
import Nav from '@/components/Nav';
import List from '@/components/List';
import { IssueProp } from '@/types/global';
import Marquee from "react-fast-marquee";
import { useForm } from "react-hook-form";
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';

export default function Home() {
  const handleOnClick = () => console.log('handleOnClick')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const router = useRouter();
  const locale = router.locale;
  const { data } = useFetch(`/_l18n/${locale}.json`)
  const { data: eventData } = useFetch(`/_l18n/events.${locale}.json`)
  const { data: issueData } = useFetch(`/_l18n/issues.${locale}.json`)

  async function onSubmit(data: any) { }
  return (
    <>
      <Head>
        <title>{data && data.homepage.pageTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg'>
        <Nav data={data} />
        <div className={styles['section-one']}>
          <div className={styles['title-wrapper']}>
            <Image
              src="/assets/icons/slogan.svg"
              alt={data && data.homepage.title}
              className={styles['titleImage']}
              width={0}
              height={0}
              priority
            />
            <h5 className={styles['non-tablet-subtitle']}>{data && data.homepage.subtitle}</h5>
            <h5 className={styles['tablet-subtitle']}>{data && data.homepage.tabletSubtitle}</h5>
            <Button name={data && data.homepage.buttonCandidate} type={ButtonTheme.PrimayNormalAlt} onClick={handleOnClick} />
          </div>
          <Image
            className={styles['homepage-dog']}
            src="/assets/images/homepage-dog.png"
            width={668}
            height={811}
            alt={data && data.homepage.title}
            priority
          />
          <Image
            className={styles['donate-dog']}
            src="/assets/icons/donate-dog.svg"
            width={197}
            height={197}
            alt={data && data.homepage.title}
            priority
          />

          <Image
            className={styles['tablet-donate-dog-white']}
            src="/assets/icons/donate-dog-white.svg"
            width={130}
            height={130}
            alt={data && 'tablet' + data.homepage.title}
            priority
          />

          <Image
            className={styles['tablet-donate-dog']}
            src="/assets/images/tablet-dog.png"
            width={375}
            height={615}
            alt={data && 'tablet' + data.homepage.title}
            priority
          />

          <Image
            className={styles['tablet-donate-dog-bg']}
            src="/assets/images/tablet-dog-bg.svg"
            width={352}
            height={257}
            alt={data && 'tablet' + data.homepage.title}
            priority
          />

        </div>
        <div className={styles["section-two"]}>
          <div className={styles["donate"]}>
            <div className={styles["donate-content"]}>
              <h3>{data && data.homepage.donateTitle}</h3>
              <p className='secondary body-large'>{data && data.homepage.donateSubtitle}</p>
              <p className='footnote gray-40'>{data && data.homepage.donateTotal}</p>
            </div>
            <div className={styles["donate-button-wrapper"]}>
              <Button name={data && data.homepage.donateButtonAction} type={ButtonTheme.SecondaryNormal} onClick={() => { }} />
            </div>
            <Image className={styles["orange-logo"]} src='assets/icons/logo-orange.svg' width={177} height={247} alt={'Orange Logo'} />
          </div>
          <div className={styles["introduction-wrapper"]}>
            <div className={styles["name-wrapper"]}>
              <p className={styles["name"]}>{data && data.homepage.primaryName}</p>
              <p className={styles["name-alt"]}>({data && data.homepage.secondaryName})</p>
            </div>
            <p className={styles["introduction"]}>{data && data.homepage.selfIntroductionOne}</p>
            <p className={styles["introduction"]}>{data && data.homepage.selfIntroductionTwo}</p>
          </div>
          <div className={styles["event"]}>
            <List data={eventData} title={data && data.homepage.eventListTitle} isFullType={false} />
          </div>
        </div>
        <div className={styles["section-three"]}>
          <Image src="/assets/icons/slogan-two.svg" width={553} height={55} className={styles["slogan-image"]} alt="更好的台灣, 一同守護" />
          <Image src="/assets/icons/slogan-two-small.svg" width={286} height={108} className={styles["slogan-image-small"]} alt="更好的台灣, 一同守護" />
          {/* <Image src="/assets/images/dog-banner.png" fill className={styles["image"]} alt="背景圖片" /> */}
        </div>
        <div className={styles["section-four"]}>
          <div className={styles["issue-four-wrapper"]}>
            <h2>{data && data.homepage.policyTitle}</h2>
            <div className={styles["issue-wrapper"]}>
              {
                issueData && issueData.map(
                  (issue: IssueProp) => {
                    return <div className={styles["issue-container"]} key={issue.id + issue.name} style={{ backgroundImage: `url(${issue.asset})` }}>
                      <h4>{issue.name}</h4>
                      <Button name={data && data.homepage.knowMoreButtonAction} type={ButtonTheme.SecondaryOutline} onClick={() => { }} />
                    </div>
                  }
                )
              }
            </div>
          </div>

        </div>
        <div className={styles["section-five"]}>
          <div className={styles["gallery-container"]}>
            <Marquee pauseOnHover={true}>
              {
                images.map((image: string, index: number) => {
                  return <div className={styles["gallery-item"]} key={`carousel image ${index}`}>
                    <Image src={image} alt={`image ${index}`} width={260} height={238} />
                  </div>
                })
              }
            </Marquee>
          </div>
          <div className={styles["contact-form"]}>
            <h2>{data && data.homepage.contactFormTitle}</h2>
            <p>{data && data.homepage.sloganTitle}</p>
            <p>{data && data.homepage.sloganContent}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles["form-row"]}>
                <label htmlFor="name">{data && data.homepage.contactFormNameInput}</label>
                <input
                  id="name"
                  aria-invalid={errors.name ? "true" : "false"}
                  placeholder={`${data && data.homepage.contactFormNamePlaceholder}`}
                  {...register("name", { required: true, maxLength: 30 })}
                />
              </div>
              <div className={styles["form-row"]}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder={"abc@gmail.com"}
                  {...register("email", { required: true, maxLength: 30 })}
                />
              </div>
              <div className={`${styles["form-row"]} ${styles["phone"]}`}>
                <label htmlFor="phonenumber">{data && data.homepage.contactFormMobileInput}</label>
                <div>
                  <input
                    id="areanumber"
                    aria-invalid={errors.areanumber ? "true" : "false"}
                    placeholder={"0900"}
                    {...register("areanumber", { required: true, maxLength: 4 })}
                  />
                  <input
                    id="phonenumber"
                    aria-invalid={errors.phonenumber ? "true" : "false"}
                    placeholder={"000000"}
                    {...register("phonenumber", { required: true, maxLength: 6 })}
                  />
                </div>
              </div>
              <div className={`${styles["form-row"]} ${styles["recommendation"]}`}>
                <label htmlFor="recommendation">{data && data.homepage.contactFormRecommendationInput}</label>
                <textarea
                  id="recommendation"
                  aria-invalid={errors.recommendation ? "true" : "false"}
                  placeholder={`${data && data.homepage.contactFormRecommendationPlaceholder}`}
                  {...register("recommendation", { required: true, maxLength: 100 })}
                />
              </div>
              <Button buttonType="submit" type={ButtonTheme.PrimayNormal} name={`${data && data.homepage.contactFormSubmitButton}`} onClick={() => { }} />
            </form>
          </div>
        </div>
        <Footer data={data} />
      </main>
    </>
  )
}
