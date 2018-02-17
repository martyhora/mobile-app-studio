<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180214205311 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE scene DROP FOREIGN KEY FK_D979EFDA166D1F9C');
        $this->addSql('DROP INDEX IDX_D979EFDA166D1F9C ON scene');
        $this->addSql('ALTER TABLE scene CHANGE project_id application_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE scene ADD CONSTRAINT FK_D979EFDA3E030ACD FOREIGN KEY (application_id) REFERENCES application (id)');
        $this->addSql('CREATE INDEX IDX_D979EFDA3E030ACD ON scene (application_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE scene DROP FOREIGN KEY FK_D979EFDA3E030ACD');
        $this->addSql('DROP INDEX IDX_D979EFDA3E030ACD ON scene');
        $this->addSql('ALTER TABLE scene CHANGE application_id project_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE scene ADD CONSTRAINT FK_D979EFDA166D1F9C FOREIGN KEY (project_id) REFERENCES application (id)');
        $this->addSql('CREATE INDEX IDX_D979EFDA166D1F9C ON scene (project_id)');
    }
}
