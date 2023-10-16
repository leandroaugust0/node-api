import NaoEncontrado from "../err/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listarAutores = autor.find();
      req.resultado = listarAutores;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).send(autorEncontrado);
      } else {
        next(new NaoEncontrado("id do autor não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorAtualizado = await autor.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (autorAtualizado !== null) {
        res.status(200).json({ message: "autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("id do autor não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndDelete(id);

      if (autorEncontrado !== null) {
        res.status(200).json({ message: "autor excluído com sucesso" });
      } else {
        next(new NaoEncontrado("id do autor não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;
