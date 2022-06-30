import styles from './styles.module.css';

export function ShopSummary({
  shop,
  onClick = () => {}
}) {
  return (
    <div className={styles.ShopSummary} onClick={onClick}>
      <div
        className={styles.shopImage}
        style={{
          backgroundImage: `url('${shop.imgURL}')`,
        }}
      ></div>
      <div className={styles.shopName}>{ shop.nome }</div>
    </div>
  )
}