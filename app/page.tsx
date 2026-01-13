import { client } from "@/libs/client";
import styles from "./page.module.css";

export default async function Home() {
  // 1. microCMSから「works」という名前のデータを取得
  const data = await client.get({ endpoint: "works" });
  const works = data.contents;

  // 2. カテゴリ名（microCMSの設定）と完全に一致させて振り分け
  const reels = works.filter((w: any) => w.category?.includes("SNSリール（縦動画）"));
  const youtube = works.filter((w: any) => w.category?.includes("Youtube（横動画）"));
  const ads = works.filter((w: any) => w.category?.includes("静止画広告"));

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>fiveauty Portfolio</h1>

      {/* SNSリール セクション */}
      <section className={styles.section}>
        <h2 className={styles.heading}>SNS REEL</h2>
        <div className={styles.gridVertical}>
          {reels.map((work: any) => (
            <div key={work.id} className={styles.card}>
              <iframe 
                src={work.video_url?.replace("watch?v=", "embed/")} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              <p className={styles.workTitle}>{work.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube セクション */}
      <section className={styles.section}>
        <h2 className={styles.heading}>YOUTUBE</h2>
        <div className={styles.gridHorizontal}>
          {youtube.map((work: any) => (
            <div key={work.id} className={styles.card}>
              <iframe 
                src={work.video_url?.replace("watch?v=", "embed/")} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              <p className={styles.workTitle}>{work.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 広告画像 セクション */}
      <section className={styles.section}>
        <h2 className={styles.heading}>AD CREATIVE</h2>
        <div className={styles.gridImages}>
          {ads.map((work: any) => (
            <div key={work.id} className={styles.card}>
              {work.images && <img src={work.images.url} alt={work.title} />}
              <p className={styles.workTitle}>{work.title}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
