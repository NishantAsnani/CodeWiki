const { STATUS_CODE } = require("../utils/constants");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const Joi = require("joi");
const Project = require("../models/projects");
const projectServices = require("../services/project.service");

async function createProject(req, res) {
    const projectSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        githubLink: Joi.string().uri().optional(),
    });
    try {
        const { error, value } = projectSchema.validate(req.body);
        if (error) {
            return sendErrorResponse(
                res,
                error?.message,
                "Validation error",
                STATUS_CODE.BAD_REQUEST,
            );
        }
        const { name, description, githubLink } = value;
        const userId = req.user._id;

        const newProject = await projectServices.createProject({
            name,
            description,
            githubLink,
            userId,
        });
        return sendSuccessResponse(
            res,
            newProject,
            "Project created successfully",
            STATUS_CODE.CREATED,
        );
    } catch (err) {
        console.error("Error creating project:", err);
        return sendErrorResponse(
            res,
            err,
            "Internal Server Error",
            STATUS_CODE.SERVER_ERROR,
        );
    }
}

async function analyzeProject(req, res) {
    const githubRepoRegex = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+\/?$/;
    const analyzeSchema = Joi.object({
        githubUrl: Joi.string().
            uri().
            regex(githubRepoRegex).
            required()
            .messages({
                'string.uri': 'The link must be a valid URL.',
                'string.pattern.base': 'The link must be a valid GitHub repository URL'
            })
    })

    try {
        const { error, value } = analyzeSchema.validate(req.body);
        if (error) {
            return sendErrorResponse(
                res,
                error?.message,
                "Validation error",
                STATUS_CODE.BAD_REQUEST,
            );
        }
        const { githubUrl } = value;

        const analysisResult = await projectServices.analyzeProject(githubUrl);

        sendSuccessResponse(
            res,
            analysisResult,
            `Project analysis for ${githubUrl} has been initiated. Results will be available shortly.`,
            STATUS_CODE.ACCEPTED,
        );

    } catch (err) {
        console.error("Error analyzing project:", err);
        return sendErrorResponse(
            res,
            err,
            "Internal Server Error",
            STATUS_CODE.SERVER_ERROR,
        );
    }
}

module.exports = {
    createProject,
    analyzeProject,
};
