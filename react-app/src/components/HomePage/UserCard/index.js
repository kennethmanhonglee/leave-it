import styles from "./UserCard.module.css";

const UserCard = ({ user, petsCount }) => {
  return (
    <div className={styles.container}>
      <div className={styles.user_card}>
        <h1>
          name: {user.firstname} {user.lastname}
        </h1>
        <h1>email: {user.email}</h1>
        <h1>pets: {petsCount}</h1>
      </div>
    </div>
  );
};

export default UserCard;
