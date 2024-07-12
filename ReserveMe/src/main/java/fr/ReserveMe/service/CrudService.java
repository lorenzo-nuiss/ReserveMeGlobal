package fr.ReserveMe.service;

import fr.ReserveMe.exception.BusinessResourceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public abstract class CrudService<T, ID> {

    protected abstract JpaRepository<T, ID> getRepository();
    private static final Logger logger = LoggerFactory.getLogger(CrudService.class);
    protected abstract String getEntityName();

    public List<T> findAll() throws BusinessResourceException {
        try {
            return getRepository().findAll();
        } catch (Exception e) {
            logger.error("Error occurred while fetching all entities", e);
            throw new BusinessResourceException("Error occurred while fetching all entities "+getEntityName() + e);        }
    }

    public Optional<T> findById(ID id) throws BusinessResourceException {
        try {
            return getRepository().findById(id);
        } catch (Exception e) {
            logger.error("Error occurred while fetching entity by id: {}", id, e);
            throw new BusinessResourceException("Entity Not Found " + e, "Aucun "+getEntityName()+" avec l'identifiant :" + id);
        }
    }

    @Transactional(readOnly=false)
    public T save(T entity) throws BusinessResourceException {
        try {
            return getRepository().save(entity);
        } catch(DataIntegrityViolationException ex){
            logger.error("Utilisateur non existant", ex);
            throw new BusinessResourceException("DuplicateValueError", "Un entité existe déjà avec le compte : "+entity, HttpStatus.CONFLICT);
        } catch (BusinessResourceException e) {
            logger.error("Utilisateur non existant", e);
            throw new BusinessResourceException("EntityNotFound", "Aucun entité avec l'identifiant: "+entity, HttpStatus.NOT_FOUND);
        } catch(Exception ex){
            logger.error("Erreur technique de création ou de mise à jour de l'entité", ex);
            throw new BusinessResourceException("SaverError", "Erreur technique de création ou de mise à jour de l'entité: "+entity, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Transactional(readOnly=false)
    public void deleteById(ID id) throws BusinessResourceException {
        try {
            getRepository().deleteById(id);
        } catch(EmptyResultDataAccessException ex){
            logger.error(String.format("Aucun entité n'existe avec l'identifiant: "+id, ex));
            throw new BusinessResourceException("DeleteUserError", "Erreur de suppression de l'entité avec l'identifiant: "+id, HttpStatus.NOT_FOUND);
        }catch(Exception ex){
            throw new BusinessResourceException("DeleteUserError", "Erreur de suppression de l'entité avec l'identifiant: "+id, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}