import { client } from "@/libs/client";
import styles from "./page.module.css";

export default async function Home() {
  // microCMSからデータを取得
  const data = await client.get({ endpoint: "blog" });
  const works = data.contents;

  // カテゴリごとに自動振り分け
  const reels = works.filter((w: any) => w.category?.includes("SNSリール"));
  const youtube = works.filter((w: any) => w.category?.includes("YouTube"));
  const ads = works.filter((w: any) => w.category?.includes("静止画広告"));

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>fiveauty Portfolio</h1>

      <div className={styles.tabs}>
        {/* SNSリール セクション */}
        <section className={styles.section}>
          <h2>SNS (リール動画)</h2>
          <div className={styles.gridVertical}>
            {reels.map((work: any) => (
              <div key={work.id} className={styles.card}>
                <iframe src={work.video_url?.replace("watch?v=", "embed/")} allowFullScreen></iframe>
                <p>{work.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube セクション */}
        <section className={styles.section}>
          <h2>YouTube (横動画)</h2>
          <div className={styles.gridHorizontal}>
            {youtube.map((work: any) => (
              <div key={work.id} className={styles.card}>
                <iframe src={work.video_url?.replace("watch?v=", "embed/")} allowFullScreen></iframe>
                <p>{work.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 広告画像 セクション */}
        <section className={styles.section}>
          <h2>広告クリエイティブ</h2>
          <div className={styles.gridImages}>
            {ads.map((work: any) => (
              <div key={work.id} className={styles.card}>
                {work.images && <img src={work.images.url} alt={work.title} />}
                <p>{work.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
